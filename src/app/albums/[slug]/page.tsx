"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchAlbum, uploadPhoto } from "../../actions";
import { useAuth } from "@/context/AuthContext";

interface Photo {
  id: number;
  url: string;
}

interface AlbumDetail {
  name: string;
  name_en?: string;
  cover_url?: string;
  description?: string;
  photos?: Photo[];
}

// 灯箱组件
function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }: {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="lightbox fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={onClose}>
      <button className="absolute top-4 right-6 text-white/70 hover:text-white text-4xl z-10" onClick={onClose}>×</button>
      {currentIndex > 0 && (
        <button className="absolute left-4 text-white/70 hover:text-white text-4xl z-10 px-4 py-8"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>
      )}
      <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <Image src={photos[currentIndex].url} alt={`Photo ${currentIndex + 1}`}
          width={1200} height={800} className="object-contain max-h-[90vh] w-auto rounded-lg" />
        <p className="text-white/50 text-xs text-center mt-2">{currentIndex + 1} / {photos.length}</p>
      </div>
      {currentIndex < photos.length - 1 && (
        <button className="absolute right-4 text-white/70 hover:text-white text-4xl z-10 px-4 py-8"
          onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>
      )}
    </div>
  );
}

export default function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { isAdmin } = useAuth();
  const [slug, setSlug] = useState<string>("");
  const [album, setAlbum] = useState<AlbumDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  const loadAlbum = async (s: string) => {
    setLoading(true);
    const data = await fetchAlbum(s);
    if (data) setAlbum(data);
    setLoading(false);
  };

  useEffect(() => {
    if (slug) loadAlbum(slug);
  }, [slug]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setUploadError("");
    for (const file of files) {
      const form = new FormData();
      form.append("file", file);
      const result = await uploadPhoto(slug, form);
      if (result.error) { setUploadError("部分图片上传失败：" + result.error); }
    }
    setUploading(false);
    loadAlbum(slug);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-rose-50 flex items-center justify-center">
        <p className="text-gray-300 text-4xl animate-pulse">…</p>
      </main>
    );
  }

  if (!album) {
    return (
      <main className="min-h-screen bg-rose-50 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400">专辑不存在</p>
        <Link href="/" className="text-pink-400 text-sm underline">返回主页</Link>
      </main>
    );
  }

  const photos = album.photos || [];

  return (
    <main className="min-h-screen bg-rose-50">
      {/* 顶部 Banner */}
      <div className="relative h-56 sm:h-72 bg-gradient-to-br from-pink-300 via-fuchsia-200 to-purple-300 overflow-hidden">
        {album.cover_url && (
          <Image src={album.cover_url} alt={album.name} fill className="object-cover opacity-60"
            onError={(e) => { e.currentTarget.style.display = "none"; }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-50/80" />
        <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors bg-black/20 hover:bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
          ← 返回主页
        </Link>
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white drop-shadow-md">{album.name}</h1>
          <p className="text-white/70 text-sm mt-1">{album.name_en}</p>
          {album.description && <p className="text-white/60 text-xs mt-2">{album.description}</p>}
        </div>
      </div>

      {/* 照片计数 + 上传按钮 */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          {photos.length > 0 ? `共 ${photos.length} 张照片` : "照片即将上传"}
        </p>
        {/* 上传按钮 - 仅管理员可见 */}
        {isAdmin && (
          <>
            <button
              onClick={() => document.getElementById("photo-upload")?.click()}
              disabled={uploading}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all
                ${uploading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white hover:opacity-90 shadow-sm cursor-pointer"}`}
            >
              {uploading ? "上传中…" : "＋ 上传图片"}
            </button>
            <input id="photo-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
          </>
        )}
      </div>
      {uploadError && <p className="text-center text-red-400 text-xs mb-4">{uploadError}</p>}

      {/* 照片网格 */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo, index) => (
              <div key={photo.id} className="photo-item relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100"
                onClick={() => setLightboxIndex(index)}>
                <Image src={photo.url} alt={`${album.name} ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-6 opacity-30">📷</div>
            <p className="text-gray-400 font-light">
              {isAdmin ? "点击上方「上传图片」开始添加照片" : "照片即将上传，敬请期待~"}
            </p>
            <Link href="/" className="inline-block mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white text-sm hover:opacity-90 transition-opacity">
              浏览其他专辑
            </Link>
          </div>
        )}
      </div>

      {/* 灯箱 */}
      {lightboxIndex !== null && photos.length > 0 && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIndex((i) => Math.min(photos.length - 1, (i ?? 0) + 1))}
        />
      )}
    </main>
  );
}
