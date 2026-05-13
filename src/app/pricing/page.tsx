"use client";

import { useState } from "react";
import Link from "next/link";

interface PlanItem {
  icon: string;
  label: string;
  value: string;
}

interface Plan {
  id: string;
  name: string;
  nameEn: string;
  price: string;
  highlight: boolean;
  badge: string | null;
  color: string;
  border: string;
  btnColor: string;
  accentText: string;
  items: PlanItem[];
}

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "基础套餐",
    nameEn: "Basic",
    price: "¥ 800",
    highlight: false,
    badge: null,
    color: "from-pink-50 to-rose-50",
    border: "border-pink-100",
    btnColor: "from-pink-300 to-rose-300 hover:from-pink-400 hover:to-rose-400",
    accentText: "text-pink-500",
    items: [
      { icon: "⏱", label: "拍摄时长", value: "约 1 小时" },
      { icon: "📸", label: "精修照片", value: "10 张" },
      { icon: "📍", label: "取景地点", value: "1 个场景" },
      { icon: "📁", label: "交付内容", value: "精修图（JPG）" },
      { icon: "🕐", label: "交付时间", value: "7 个工作日内" },
      { icon: "🔄", label: "修改次数", value: "1 次调色微调" },
    ],
  },
  {
    id: "standard",
    name: "标准套餐",
    nameEn: "Standard",
    price: "¥ 1500",
    highlight: true,
    badge: "最受欢迎",
    color: "from-fuchsia-50 to-purple-50",
    border: "border-fuchsia-200",
    btnColor: "from-pink-400 to-fuchsia-500 hover:from-pink-500 hover:to-fuchsia-600",
    accentText: "text-fuchsia-500",
    items: [
      { icon: "⏱", label: "拍摄时长", value: "约 2 小时" },
      { icon: "📸", label: "精修照片", value: "25 张" },
      { icon: "📍", label: "取景地点", value: "2 个场景" },
      { icon: "📁", label: "交付内容", value: "精修图 + 原图" },
      { icon: "🕐", label: "交付时间", value: "5 个工作日内" },
      { icon: "🔄", label: "修改次数", value: "2 次调色微调" },
    ],
  },
  {
    id: "premium",
    name: "高级套餐",
    nameEn: "Premium",
    price: "¥ 2500",
    highlight: false,
    badge: null,
    color: "from-purple-50 to-indigo-50",
    border: "border-purple-100",
    btnColor: "from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400",
    accentText: "text-purple-500",
    items: [
      { icon: "⏱", label: "拍摄时长", value: "约 3~4 小时" },
      { icon: "📸", label: "精修照片", value: "50 张+" },
      { icon: "📍", label: "取景地点", value: "3 个场景（含换装）" },
      { icon: "📁", label: "交付内容", value: "精修图 + 原图 + 样片" },
      { icon: "🕐", label: "交付时间", value: "3 个工作日内" },
      { icon: "🔄", label: "修改次数", value: "不限次调色微调" },
    ],
  },
];

const NOTES = [
  "以上价格均为参考，实际费用可能因拍摄地点、季节及特殊需求有所调整。",
  "跨城市拍摄需另行商议交通与住宿费用。",
  "周边 & 收藏品拍摄有专属套餐，欢迎私信单独沟通。",
  "预约拍摄前请先通过私信确认档期，锁定日期需支付定金。",
];

function WechatModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 shadow-2xl max-w-xs w-full mx-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-4xl mb-3">💬</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">请添加微信咨询</h3>
        <p className="text-gray-500 text-sm mb-4">备注"约拍"，我会尽快回复你 ♡</p>
        <div className="bg-gradient-to-r from-pink-50 to-fuchsia-50 rounded-2xl py-3 px-6 mb-6">
          <p className="text-xs text-gray-400 mb-1">微信号</p>
          <p className="text-xl font-bold text-fuchsia-500 tracking-wider">sxy12345678</p>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          好的~
        </button>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="min-h-screen bg-rose-50">
      {showModal && <WechatModal onClose={() => setShowModal(false)} />}
      {/* ===== 顶部 Banner ===== */}
      <div className="relative h-56 sm:h-72 bg-gradient-to-br from-pink-300 via-fuchsia-200 to-purple-300 overflow-hidden">
        {/* 光晕装饰 */}
        <div className="absolute top-8 left-1/3 w-52 h-52 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute bottom-4 right-1/3 w-60 h-60 rounded-full bg-purple-200/30 blur-3xl" />

        {/* 星星装饰 */}
        <div className="absolute top-5 left-0 right-0 text-center text-white/30 text-xs tracking-[0.5em] select-none">
          ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦
        </div>

        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-50/80" />

        {/* 返回按钮 */}
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors bg-black/20 hover:bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          ← 返回主页
        </Link>

        {/* 标题 */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white drop-shadow-md">
            约拍套餐
          </h1>
          <p className="text-white/70 text-sm mt-1">Pricing</p>
        </div>
      </div>

      {/* ===== 套餐卡片区 ===== */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-3">Packages</p>
            <h2 className="section-title text-2xl font-semibold text-gray-800">选择适合你的套餐</h2>
            <p className="mt-4 text-gray-400 font-light text-sm max-w-md mx-auto">
              每个套餐均可根据实际需求灵活调整，欢迎私信聊聊你的想法 ♡
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-3xl border-2 ${plan.border} bg-gradient-to-b ${plan.color} shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  plan.highlight
                    ? "ring-2 ring-fuchsia-300 ring-offset-2 ring-offset-rose-50 shadow-lg shadow-fuchsia-100"
                    : ""
                }`}
              >
                {/* 推荐角标 */}
                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-pink-400 to-fuchsia-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* 顶部标题区 */}
                <div className="p-7 pb-5 border-b border-white/60">
                  <p className={`text-xs tracking-[0.25em] uppercase font-medium mb-1 ${plan.accentText}`}>
                    {plan.nameEn}
                  </p>
                  <h3 className="text-xl font-semibold text-gray-800">{plan.name}</h3>
                  <p className="mt-3 text-3xl font-bold text-gray-700">{plan.price}</p>
                </div>

                {/* 内容列表 */}
                <div className="flex-1 p-7 pt-5">
                  <ul className="space-y-3">
                    {plan.items.map((item) => (
                      <li key={item.label} className="flex items-start gap-3">
                        <span className="text-base leading-none mt-0.5">{item.icon}</span>
                        <div>
                          <span className="text-gray-400 text-xs font-light">{item.label}：</span>
                          <span className="text-gray-700 text-sm font-medium">{item.value}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 按钮 */}
                <div className="px-7 pb-7">
                  <button
                    onClick={() => setShowModal(true)}
                    className={`block w-full text-center py-3 rounded-2xl bg-gradient-to-r ${plan.btnColor} text-white text-sm font-medium shadow-sm transition-all duration-300 hover:shadow-md`}
                  >
                    立即咨询
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 分隔装饰 */}
      <div className="py-4 bg-gradient-to-r from-pink-100 via-fuchsia-50 to-purple-100 text-center text-pink-300 tracking-[0.5em] text-xs select-none">
        ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦
      </div>

      {/* ===== 补充说明 ===== */}
      <section className="py-12 px-6 bg-gradient-to-b from-fuchsia-50 to-rose-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-3">Notes</p>
            <h2 className="section-title text-2xl font-semibold text-gray-800">温馨说明</h2>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-50 space-y-4">
            {NOTES.map((note, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-pink-300 to-fuchsia-300 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-600 text-sm font-light leading-relaxed">{note}</p>
              </div>
            ))}
            <div className="pt-2 border-t border-pink-50 text-center">
              <p className="text-gray-400 text-xs font-light">
                有任何疑问都欢迎私信，一起聊聊你的想法 ♡
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 底部返回 ===== */}
      <div className="py-12 text-center bg-gradient-to-r from-pink-100 via-fuchsia-50 to-purple-100">
        <p className="text-gray-400 text-xs tracking-widest mb-6">✦ &nbsp; ✧ &nbsp; ✦</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white text-sm font-medium shadow-md shadow-pink-200 hover:shadow-pink-300 hover:from-pink-500 hover:to-fuchsia-500 transition-all duration-300"
        >
          ← 返回主页
        </Link>
        <p
          className="mt-8 text-3xl"
          style={{
            fontFamily: "var(--font-dancing, cursive)",
            background: "linear-gradient(90deg, #ff6eb4, #c678dd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Sylvia
        </p>
        <p className="text-gray-400 text-xs tracking-widest mt-1">Photography &amp; Art Direction</p>
      </div>
    </main>
  );
}
