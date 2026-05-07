"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allAlbums } from "../../data/albums";

// 灯箱组件
function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  return (
    <div
      className="lightbox fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* 关闭按钮 */}
      <button
        className="absolute top-4 right-6 text-white/70 hover:text-white text-4xl z-10"
        onClick={onClose}
      >
        ×
      </button>

      {/* 上一张 */}
      {currentIndex > 0 && (
        <button
          className="absolute left-4 text-white/70 hover:text-white text-4xl z-10 px-4 py-8"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          ‹
        </button>
      )}

      {/* 图片 */}
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          width={1200}
          height={800}
          className="object-contain max-h-[90vh] w-auto rounded-lg"
        />
        <p className="text-white/50 text-xs text-center mt-2">
          {currentIndex + 1} / {photos.length}
        </p>
      </div>

      {/* 下一张 */}
      {currentIndex < photos.length - 1 && (
        <button
          className="absolute right-4 text-white/70 hover:text-white text-4xl z-10 px-4 py-8"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          ›
        </button>
      )}
    </div>
  );
}

export default function AlbumPage({ params }) {
  const { slug } = params;
  const album = allAlbums.find((a) => a.slug === slug);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!album) {
    notFound();
  }

  const hasPhotos = album.photos && album.photos.length > 0;

  return (
    <main className="min-h-screen bg-rose-50">
      {/* 顶部 Banner */}
      <div className="relative h-56 sm:h-72 bg-gradient-to-br from-pink-300 via-fuchsia-200 to-purple-300 overflow-hidden">
        {/* 如果有封面图 */}
        {album.cover && (
          <Image
            src={album.cover}
            alt={album.name}
            fill
            className="object-cover opacity-60"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        )}
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-50/80" />

        {/* 返回按钮 */}
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors bg-black/20 hover:bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          ← 返回主页
        </Link>

        {/* 专辑标题 */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white drop-shadow-md">
            {album.name}
          </h1>
          <p className="text-white/70 text-sm mt-1">{album.nameEn}</p>
          {album.description && (
            <p className="text-white/60 text-xs mt-2">{album.description}</p>
          )}
        </div>
      </div>

      {/* 照片计数 */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <p className="text-gray-400 text-sm">
          {hasPhotos ? `共 ${album.photos.length} 张照片` : "照片即将上传"}
        </p>
      </div>

      {/* 照片网格 */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {hasPhotos ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {album.photos.map((photo, index) => (
              <div
                key={index}
                className="photo-item relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100"
                onClick={() => setLightboxIndex(index)}
              >
                <Image
                  src={photo}
                  alt={`${album.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-6 opacity-30">📷</div>
            <p className="text-gray-400 font-light">照片正在整理中，敬请期待~</p>
            <Link
              href="/"
              className="inline-block mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white text-sm hover:opacity-90 transition-opacity"
            >
              浏览其他专辑
            </Link>
          </div>
        )}
      </div>

      {/* 灯箱 */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={album.photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))}
          onNext={() => setLightboxIndex((i) => Math.min(album.photos.length - 1, i + 1))}
        />
      )}
    </main>
  );
}
