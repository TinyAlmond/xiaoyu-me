"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/app/actions";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { isAdmin, setIsAdmin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) router.replace("/");
  }, [isAdmin, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(username, password);
    setLoading(false);
    if (result.success) {
      setIsAdmin(true);
      router.push("/");
    } else {
      setError(result.error || "登录失败");
    }
  };

  return (
    <main className="min-h-screen bg-rose-50 flex flex-col">
      {/* 顶部 Banner */}
      <div className="relative h-44 sm:h-56 bg-gradient-to-br from-pink-300 via-fuchsia-200 to-purple-300 overflow-hidden">
        <div className="absolute top-8 left-1/4 w-48 h-48 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute bottom-4 right-1/4 w-56 h-56 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute top-5 left-0 right-0 text-center text-white/30 text-xs tracking-[0.5em] select-none">
          ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-50/80" />
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors bg-black/20 hover:bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          ← 返回主页
        </Link>
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white drop-shadow-md">管理员登录</h1>
          <p className="text-white/70 text-sm mt-1">Admin Login</p>
        </div>
      </div>

      {/* 登录表单 */}
      <section className="flex-1 flex items-start justify-center px-6 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-sm w-full border border-pink-50">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🔐</div>
            <p className="text-gray-400 text-xs">输入管理员账号以继续操作</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">用户名</label>
              <input
                type="text"
                className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="请输入用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">密码</label>
              <input
                type="password"
                className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "登录中…" : "登录"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
