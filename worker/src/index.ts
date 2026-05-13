interface Env {
  DB: D1Database;
  PHOTOS: R2Bucket;
  ALLOWED_ORIGIN: string;
}

const ADMIN_SECRET = "sylvia-admin-2026"; // 部署后可在 Worker 环境变量里改掉

function cors(origin: string) {
  const allowed = ["https://suxiaoyu.me", "http://localhost:3000"];
  const o = allowed.includes(origin) ? origin : allowed[0];
  return {
    "Access-Control-Allow-Origin": o,
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Secret",
  };
}

function json(data: unknown, status = 200, origin = "") {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...cors(origin) },
  });
}

function isAdmin(request: Request) {
  return request.headers.get("X-Admin-Secret") === ADMIN_SECRET;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);
    const path = url.pathname;

    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors(origin) });
    }

    // ===== GET /api/albums?category=photo|collectible|client =====
    if (request.method === "GET" && path === "/api/albums") {
      const category = url.searchParams.get("category");
      let sql = "SELECT * FROM albums";
      const params: string[] = [];
      if (category) {
        sql += " WHERE category = ?";
        params.push(category);
      }
      sql += " ORDER BY created_at DESC";
      const { results } = await env.DB.prepare(sql).bind(...params).all();
      return json(results, 200, origin);
    }

    // ===== GET /api/albums/:slug =====
    const albumMatch = path.match(/^\/api\/albums\/([^/]+)$/);
    if (request.method === "GET" && albumMatch) {
      const slug = albumMatch[1];
      const album = await env.DB.prepare("SELECT * FROM albums WHERE slug = ?").bind(slug).first();
      if (!album) return json({ error: "not found" }, 404, origin);
      const { results: photos } = await env.DB.prepare(
        "SELECT * FROM photos WHERE album_id = ? ORDER BY sort_order ASC, created_at ASC"
      ).bind(album.id).all();
      return json({ ...album, photos }, 200, origin);
    }

    // ===== POST /api/albums (新建专辑，需要 admin secret) =====
    if (request.method === "POST" && path === "/api/albums") {
      if (!isAdmin(request)) return json({ error: "unauthorized" }, 401, origin);
      const body = await request.json() as {
        name?: string;
        nameEn?: string;
        description?: string;
        category?: string;
        slug?: string;
      };
      const { name, nameEn, description, category, slug } = body;
      if (!name || !slug || !category) return json({ error: "name, slug, category required" }, 400, origin);
      await env.DB.prepare(
        "INSERT INTO albums (slug, name, name_en, description, category) VALUES (?, ?, ?, ?, ?)"
      ).bind(slug, name, nameEn || "", description || "", category).run();
      const album = await env.DB.prepare("SELECT * FROM albums WHERE slug = ?").bind(slug).first();
      return json(album, 201, origin);
    }

    // ===== POST /api/albums/:slug/upload (上传图片) =====
    const uploadMatch = path.match(/^\/api\/albums\/([^/]+)\/upload$/);
    if (request.method === "POST" && uploadMatch) {
      if (!isAdmin(request)) return json({ error: "unauthorized" }, 401, origin);
      const slug = uploadMatch[1];
      const album = await env.DB.prepare("SELECT * FROM albums WHERE slug = ?").bind(slug).first<{
        id: number;
        cover_url: string | null;
      }>();
      if (!album) return json({ error: "album not found" }, 404, origin);

      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      if (!file) return json({ error: "no file" }, 400, origin);

      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const key = `${slug}/${Date.now()}.${ext}`;
      await env.PHOTOS.put(key, file.stream(), {
        httpMetadata: { contentType: file.type },
      });

      const photoUrl = `https://cdn.suxiaoyu.me/${key}`;
      const { meta } = await env.DB.prepare(
        "INSERT INTO photos (album_id, url) VALUES (?, ?)"
      ).bind(album.id, photoUrl).run();

      // 如果是第一张图，自动设为封面
      if (!album.cover_url) {
        await env.DB.prepare("UPDATE albums SET cover_url = ? WHERE id = ?").bind(photoUrl, album.id).run();
      }

      return json({ url: photoUrl, id: meta.last_row_id }, 201, origin);
    }

    // ===== DELETE /api/photos/:id =====
    const photoMatch = path.match(/^\/api\/photos\/(\d+)$/);
    if (request.method === "DELETE" && photoMatch) {
      if (!isAdmin(request)) return json({ error: "unauthorized" }, 401, origin);
      const id = parseInt(photoMatch[1]);
      const photo = await env.DB.prepare("SELECT * FROM photos WHERE id = ?").bind(id).first<{
        url: string;
      }>();
      if (!photo) return json({ error: "not found" }, 404, origin);
      // 从 R2 删除
      const key = photo.url.split("r2.dev/")[1];
      if (key) await env.PHOTOS.delete(key);
      await env.DB.prepare("DELETE FROM photos WHERE id = ?").bind(id).run();
      return json({ ok: true }, 200, origin);
    }

    return json({ error: "not found" }, 404, origin);
  },
};
