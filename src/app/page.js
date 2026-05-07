"use client";

import Link from "next/link";
import Image from "next/image";
import { photoAlbums, collectiblesAlbums } from "./data/albums";

function AlbumCard({ album }) {
  return (
    <Link href={`/albums/${album.slug}`}>
      <div className="album-card rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer">
        {/* 封面图 */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-pink-200 via-fuchsia-100 to-purple-200">
          {album.cover && (
            <Image
              src={album.cover}
              alt={album.name}
              fill
              className="object-cover"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          )}
          {/* 悬浮遮罩 */}
          <div className="album-overlay absolute inset-0 bg-gradient-to-t from-pink-600/70 via-transparent to-transparent flex items-end p-4">
            <p className="text-white text-sm font-light">{album.description}</p>
          </div>
        </div>
        {/* 专辑名 */}
        <div className="p-4 text-center">
          <h3 className="text-gray-800 font-semibold text-lg">{album.name}</h3>
          <p className="text-pink-400 text-xs mt-1 font-light">{album.nameEn}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* ===== HERO 区域 ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* 背景图片 */}
        <Image
          src="/hero.jpg"
          alt="Pink Lake"
          fill
          className="object-cover"
          priority
        />
        {/* 图片上叠加半透明粉色遮罩，让文字更清晰 */}
        <div className="absolute inset-0 bg-pink-400/20" />

        {/* 粉色光晕装饰 */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-300/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-fuchsia-200/20 blur-3xl" />

        {/* 顶部星星装饰 */}
        <div className="absolute top-8 left-0 right-0 text-center text-white/40 text-xs tracking-[0.5em] select-none">
          ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦
        </div>

        {/* 主标题区域 */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
          <div className="flex items-center gap-3 text-white/60 text-sm tracking-widest uppercase font-light">
            <span>✦</span>
            <span>Photography</span>
            <span>✦</span>
          </div>

          <h1 className="sylvia-title text-[9rem] sm:text-[13rem] leading-none select-none">
            Sylvia
          </h1>

          <p className="text-white/80 text-lg font-light tracking-wider mt-2">
            用镜头记录每一个美好瞬间
          </p>

          <div className="flex items-center gap-6 mt-4">
            <span className="h-px w-16 bg-white/40" />
            <span className="text-white/60 text-xs tracking-widest">SCROLL TO EXPLORE</span>
            <span className="h-px w-16 bg-white/40" />
          </div>
        </div>

        {/* 滚动提示箭头 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <div className="scroll-arrow text-white/60 text-2xl">↓</div>
        </div>

        {/* 底部渐变过渡 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rose-50 to-transparent" />
      </section>

      {/* ===== 摄影专辑区域 ===== */}
      <section className="py-20 px-6 bg-rose-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-3">Portfolio</p>
            <h2 className="section-title text-3xl font-semibold text-gray-800">
              摄影专辑
            </h2>
            <p className="mt-4 text-gray-500 font-light text-sm max-w-md mx-auto">
              按拍摄地分类，点击专辑浏览完整照片集
            </p>
          </div>

          {photoAlbums.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {photoAlbums.map((album) => (
                <AlbumCard key={album.slug} album={album} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">📷</div>
              <p className="text-sm">专辑即将上线，敬请期待~</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== 分隔装饰 ===== */}
      <div className="py-8 bg-gradient-to-r from-pink-100 via-fuchsia-50 to-purple-100 text-center text-pink-300 tracking-[0.5em] text-xs select-none">
        ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦
      </div>

      {/* ===== 二次元周边专区 ===== */}
      <section className="py-20 px-6 bg-gradient-to-b from-fuchsia-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-purple-400 text-sm tracking-[0.3em] uppercase mb-3">Collectibles</p>
            <h2 className="section-title text-3xl font-semibold text-gray-800">
              二次元周边
            </h2>
            <p className="mt-4 text-gray-500 font-light text-sm max-w-md mx-auto">
              动漫 &amp; 游戏周边的精致写真
            </p>
          </div>

          {collectiblesAlbums.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {collectiblesAlbums.map((album) => (
                <AlbumCard key={album.slug} album={album} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">🎌</div>
              <p className="text-sm">周边专辑即将上线~</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== 页脚 ===== */}
      <footer className="py-12 px-6 bg-gradient-to-r from-pink-100 via-fuchsia-50 to-purple-100 text-center">
        <p
          className="text-4xl mb-3"
          style={{
            fontFamily: "var(--font-dancing), cursive",
            background: "linear-gradient(90deg, #ff6eb4, #c678dd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Sylvia
        </p>
        <p className="text-gray-400 text-xs tracking-widest mt-1">
          Photography &amp; Art Direction
        </p>
        <div className="mt-4 text-pink-300 tracking-[0.3em] text-xs">
          ✦ &nbsp; ✧ &nbsp; ✦
        </div>
      </footer>
    </main>
  );
}
