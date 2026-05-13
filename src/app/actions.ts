"use server";

const API = "https://sylvia-photo-api.longsizhuo.workers.dev";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "sylvia-admin-2026";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sylvia666";

// 验证管理员密码
export async function verifyAdmin(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD;
}

// 获取专辑列表（公开）
export async function fetchAlbums(category?: string) {
  const url = category ? `${API}/api/albums?category=${category}` : `${API}/api/albums`;
  const res = await fetch(url);
  return res.json();
}

// 获取单个专辑（公开）
export async function fetchAlbum(slug: string) {
  const res = await fetch(`${API}/api/albums/${slug}`);
  if (!res.ok) return null;
  return res.json();
}

// 新建专辑（需要管理员密码）
export async function createAlbum(
  password: string,
  data: { name: string; nameEn?: string; description?: string; category: string; slug: string }
) {
  if (password !== ADMIN_PASSWORD) return { error: "密码错误" };
  const res = await fetch(`${API}/api/albums`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Admin-Secret": ADMIN_SECRET },
    body: JSON.stringify(data),
  });
  if (!res.ok) return { error: "创建失败" };
  return res.json();
}

// 上传图片（需要管理员密码）
export async function uploadPhoto(password: string, slug: string, formData: FormData) {
  if (password !== ADMIN_PASSWORD) return { error: "上传失败" };
  const res = await fetch(`${API}/api/albums/${slug}/upload`, {
    method: "POST",
    headers: { "X-Admin-Secret": ADMIN_SECRET },
    body: formData,
  });
  if (!res.ok) return { error: "上传失败" };
  return res.json();
}
