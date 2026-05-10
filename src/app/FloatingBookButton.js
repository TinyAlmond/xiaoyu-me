"use client";

import Link from "next/link";

export default function FloatingBookButton() {
  return (
    <Link
      href="/pricing"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white font-semibold text-sm shadow-lg shadow-pink-300/50 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 hover:scale-110 transition-transform duration-200 select-none"
    >
      📷 约拍
    </Link>
  );
}
