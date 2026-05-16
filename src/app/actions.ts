"use server";

import { createSession, validateSession, destroySession } from "@/lib/session";

const API = "https://sylvia-photo-api.longsizhuo.workers.dev";

function getAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET is not set");
  return secret;
}

// 登录
export async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (username !== expectedUsername || password !== expectedPassword) {
    return { success: false, error: "用户名或密码错误" };
  }

  await createSession();
  return { success: true };
}

// 登出
export async function logout(): Promise<void> {
  await destroySession();
}

// 获取登录状态
export async function getAuthStatus(): Promise<{ isAdmin: boolean }> {
  const valid = await validateSession();
  return { isAdmin: valid };
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

// 新建专辑（需要登录）
export async function createAlbum(
  data: { name: string; nameEn?: string; description?: string; category: string; slug: string }
) {
  const valid = await validateSession();
  if (!valid) return { error: "未登录" };

  const res = await fetch(`${API}/api/albums`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Admin-Secret": getAdminSecret() },
    body: JSON.stringify(data),
  });
  if (!res.ok) return { error: "创建失败" };
  return res.json();
}

// 删除图片（需要登录）
export async function deletePhoto(photoId: number): Promise<{ ok?: boolean; error?: string }> {
  const valid = await validateSession();
  if (!valid) return { error: "未登录" };

  const res = await fetch(`${API}/api/photos/${photoId}`, {
    method: "DELETE",
    headers: { "X-Admin-Secret": getAdminSecret() },
  });
  if (!res.ok) return { error: "删除失败" };
  return res.json();
}

// 上传图片（需要登录）
export async function uploadPhoto(slug: string, formData: FormData) {
  const valid = await validateSession();
  if (!valid) return { error: "未登录" };

  const res = await fetch(`${API}/api/albums/${slug}/upload`, {
    method: "POST",
    headers: { "X-Admin-Secret": getAdminSecret() },
    body: formData,
  });
  if (!res.ok) return { error: "上传失败" };
  return res.json();
}
