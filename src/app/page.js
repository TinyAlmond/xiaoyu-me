"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { verifyAdmin, fetchAlbums as fetchAlbumsAction, createAlbum } from "./actions";

// ===== 想添加更多轮播图？在这里加文件名就行 =====
const HERO_IMAGES = [
  "/hero.jpg",
  "/11.jpg",
  "/22.jpg",
];

// ===== 管理员登录弹框 =====
function AdminLoginModal({ onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const ok = await verifyAdmin(password);
    setLoading(false);
    if (ok) {
      localStorage.setItem("admin_pwd", password);
      onSuccess(password);
      onClose();
    } else {
      setError("密码错误");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-xs w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="text-4xl mb-3 text-center">🔐</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">管理员验证</h3>
        <p className="text-gray-400 text-xs text-center mb-6">输入管理员密码以继续操作</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm text-center focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-2xl border border-pink-200 text-gray-500 text-sm hover:bg-pink-50 transition-colors">取消</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white text-sm font-medium hover:opacity-90 disabled:opacity-50">
              {loading ? "验证中…" : "确认"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ===== 新建专辑弹框 =====
function NewAlbumModal({ category, adminPwd, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const slugify = (str) =>
    str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");
    const slug = slugify(nameEn || name) + "-" + Date.now();
    const result = await createAlbum(adminPwd, { name, nameEn, description, category, slug });
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      onCreated(result);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">新建专辑</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">专辑名称 *</label>
            <input
              className="w-full border border-pink-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="如：西澳粉红湖"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">英文名（选填）</label>
            <input
              className="w-full border border-pink-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="如：Pink Lake WA"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">简介（选填）</label>
            <input
              className="w-full border border-pink-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="一句话描述这个专辑"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-2xl border border-pink-200 text-gray-500 text-sm hover:bg-pink-50 transition-colors">
              取消
            </button>
            <button type="submit" disabled={loading} className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? "创建中…" : "创建"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ===== 专辑卡片 =====
function AlbumCard({ album }) {
  const cover = album.cover_url || album.cover;
  return (
    <Link href={`/albums/${album.slug}`}>
      <div className="album-card rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer">
        <div className="relative w-full aspect-square bg-gradient-to-br from-pink-200 via-fuchsia-100 to-purple-200">
          {cover && (
            <Image src={cover} alt={album.name} fill className="object-cover"
              onError={(e) => { e.currentTarget.style.display = "none"; }} />
          )}
          <div className="album-overlay absolute inset-0 bg-gradient-to-t from-pink-600/70 via-transparent to-transparent flex items-end p-4">
            <p className="text-white text-sm font-light">{album.description}</p>
          </div>
        </div>
        <div className="p-4 text-center">
          <h3 className="text-gray-800 font-semibold text-lg">{album.name}</h3>
          <p className="text-pink-400 text-xs mt-1 font-light">{album.name_en || album.nameEn}</p>
        </div>
      </div>
    </Link>
  );
}

// ===== 专辑区块（含新建按钮）=====
function AlbumSection({ title, titleEn, description, category, bgClass, accentClass, emptyIcon }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [adminPwd, setAdminPwd] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_pwd");
    if (saved) setAdminPwd(saved);
  }, []);

  const loadAlbums = useCallback(async () => {
    setLoading(true);
    const data = await fetchAlbumsAction(category);
    setAlbums(data);
    setLoading(false);
  }, [category]);

  useEffect(() => { loadAlbums(); }, [loadAlbums]);

  const handleNewAlbumClick = () => {
    if (adminPwd) {
      setShowModal(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <section className={`py-20 px-6 ${bgClass}`}>
      {showLogin && (
        <AdminLoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={(pwd) => { setAdminPwd(pwd); setShowModal(true); }}
        />
      )}
      {showModal && (
        <NewAlbumModal
          category={category}
          adminPwd={adminPwd}
          onClose={() => setShowModal(false)}
          onCreated={(album) => setAlbums((prev) => [album, ...prev])}
        />
      )}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className={`${accentClass} text-sm tracking-[0.3em] uppercase mb-3`}>{titleEn}</p>
          <h2 className="section-title text-3xl font-semibold text-gray-800">{title}</h2>
          <p className="mt-4 text-gray-500 font-light text-sm max-w-md mx-auto">{description}</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-300 text-4xl animate-pulse">…</div>
        ) : albums.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.map((album) => <AlbumCard key={album.slug} album={album} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">{emptyIcon}</div>
            <p className="text-sm">专辑即将上线，敬请期待~</p>
          </div>
        )}

        {/* 新建专辑按钮 */}
        <div className="text-center mt-10">
          <button
            onClick={handleNewAlbumClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-dashed border-pink-300 text-pink-400 text-sm hover:bg-pink-50 hover:border-pink-400 transition-all"
          >
            <span className="text-lg">＋</span> 新建专辑
          </button>
        </div>
      </div>
    </section>
  );
}

// ===== Hero 轮播 =====
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const total = HERO_IMAGES.length;

  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ width: `${total * 100}%`, transform: `translateX(-${current * (100 / total)}%)` }}
      >
        {HERO_IMAGES.map((src, i) => (
          <div key={src} className="relative h-full" style={{ width: `${100 / total}%` }}>
            <Image src={src} alt={`Hero ${i + 1}`} fill className="object-cover" priority={i === 0} />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-pink-400/20" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-300/25 blur-3xl" />

      <div className="absolute top-8 left-0 right-0 text-center text-white/40 text-xs tracking-[0.5em] select-none z-10">
        ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦
      </div>

      {total > 1 && (
        <button onClick={prev} className="absolute left-4 sm:left-8 z-20 text-white/60 hover:text-white text-4xl sm:text-5xl transition-colors px-2 py-4" aria-label="上一张">‹</button>
      )}

      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
        <div className="flex items-center gap-3 text-white/60 text-sm tracking-widest uppercase font-light">
          <span>✦</span><span>Photography</span><span>✦</span>
        </div>
        <h1 className="sylvia-title text-[9rem] sm:text-[13rem] leading-none select-none">Sylvia</h1>
        <p className="text-white/80 text-lg font-light tracking-wider mt-2">用镜头记录每一个美好瞬间</p>
        <div className="flex items-center gap-6 mt-4">
          <span className="h-px w-16 bg-white/40" />
          <span className="text-white/60 text-xs tracking-widest">SCROLL TO EXPLORE</span>
          <span className="h-px w-16 bg-white/40" />
        </div>
      </div>

      {total > 1 && (
        <button onClick={next} className="absolute right-4 sm:right-8 z-20 text-white/60 hover:text-white text-4xl sm:text-5xl transition-colors px-2 py-4" aria-label="下一张">›</button>
      )}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
        {total > 1 && (
          <div className="flex gap-2">
            {HERO_IMAGES.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
                aria-label={`第 ${i + 1} 张`} />
            ))}
          </div>
        )}
        <div className="scroll-arrow text-white/60 text-2xl">↓</div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rose-50 to-transparent" />
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroCarousel />

      {/* 摄影专辑 */}
      <AlbumSection
        title="摄影专辑"
        titleEn="Portfolio"
        description="按拍摄地分类，点击专辑浏览完整照片集"
        category="photo"
        bgClass="bg-rose-50"
        accentClass="text-pink-400"
        emptyIcon="📷"
      />

      <div className="py-8 bg-gradient-to-r from-pink-100 via-fuchsia-50 to-purple-100 text-center text-pink-300 tracking-[0.5em] text-xs select-none">
        ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦
      </div>

      {/* 客户评价 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-3">Testimonials</p>
            <h2 className="section-title text-3xl font-semibold text-gray-800">客户好评</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { bg: "bg-rose-50", from: "from-pink-300", to: "to-fuchsia-300", char: "小", name: "小鹿同学", text: "Sylvia 拍出了我最喜欢的照片，光线和构图都超棒！每一张都像杂志大片一样。" },
              { bg: "bg-fuchsia-50", from: "from-fuchsia-300", to: "to-purple-300", char: "晴", name: "晴天小熊", text: "第一次约拍，特别紧张，Sylvia 温柔引导，拍完超级自然，照片美得我哭出来了！" },
              { bg: "bg-purple-50", from: "from-purple-300", to: "to-pink-300", char: "糖", name: "棉花糖泡泡", text: "氛围感绝了！出片速度也很快，选图超级温柔，下次还要找 Sylvia 拍！" },
            ].map((t) => (
              <div key={t.name} className={`flex flex-col items-center text-center ${t.bg} rounded-2xl p-8 shadow-sm`}>
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.from} ${t.to} mb-4 flex items-center justify-center text-white text-xl font-bold`}>{t.char}</div>
                <p className="text-gray-500 text-sm font-light leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="text-pink-500 font-semibold text-sm mb-1">{t.name}</p>
                <span className="text-amber-400 text-base tracking-wider">★★★★★</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-8 bg-gradient-to-r from-pink-100 via-fuchsia-50 to-purple-100 text-center text-pink-300 tracking-[0.5em] text-xs select-none">
        ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦
      </div>

      {/* 约拍客片 */}
      <AlbumSection
        title="约拍客片"
        titleEn="Client Works"
        description="真实约拍成片，每一张都是独特的故事"
        category="client"
        bgClass="bg-pink-50"
        accentClass="text-rose-400"
        emptyIcon="🌸"
      />

      <div className="py-8 bg-gradient-to-r from-pink-100 via-fuchsia-50 to-purple-100 text-center text-pink-300 tracking-[0.5em] text-xs select-none">
        ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦
      </div>

      {/* 二次元周边 */}
      <AlbumSection
        title="二次元周边"
        titleEn="Collectibles"
        description="动漫 & 游戏周边的精致写真"
        category="collectible"
        bgClass="bg-gradient-to-b from-fuchsia-50 to-purple-50"
        accentClass="text-purple-400"
        emptyIcon="🎌"
      />

      {/* 开始约拍 CTA */}
      <section className="py-24 px-6 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-500 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <p className="text-white/70 text-sm tracking-[0.3em] uppercase">Let&apos;s Shoot</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white drop-shadow">开始约拍</h2>
          <p className="text-white/80 text-base font-light">选好地点，我们一起记录美好</p>
          <div className="flex items-center gap-4 mt-2 flex-wrap justify-center">
            <Link href="/pricing" className="px-8 py-3 rounded-full bg-white text-pink-500 font-semibold text-sm shadow-md hover:scale-105 transition-transform duration-200">查看套餐</Link>
            <Link href="/about" className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold text-sm hover:bg-white/10 hover:scale-105 transition-all duration-200">关于我</Link>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-12 px-6 bg-gradient-to-r from-pink-100 via-fuchsia-50 to-purple-100 text-center">
        <p className="text-4xl mb-3" style={{ fontFamily: "var(--font-dancing), cursive", background: "linear-gradient(90deg, #ff6eb4, #c678dd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sylvia</p>
        <p className="text-gray-400 text-xs tracking-widest mt-1">Photography &amp; Art Direction</p>
        <div className="mt-4 text-pink-300 tracking-[0.3em] text-xs">✦ &nbsp; ✧ &nbsp; ✦</div>
      </footer>
    </main>
  );
}
