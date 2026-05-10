import Link from "next/link";
import Image from "next/image";

const STYLES = [
  { label: "自然光", color: "from-pink-200 to-rose-200", text: "text-rose-600" },
  { label: "胶片感", color: "from-amber-100 to-orange-100", text: "text-amber-600" },
  { label: "旅行纪实", color: "from-sky-100 to-blue-100", text: "text-sky-600" },
  { label: "二次元周边", color: "from-purple-100 to-fuchsia-100", text: "text-purple-600" },
  { label: "人像写真", color: "from-pink-100 to-fuchsia-100", text: "text-pink-600" },
  { label: "日系清新", color: "from-emerald-50 to-teal-100", text: "text-teal-600" },
];

const GEAR = [
  { name: "Sony A7IV", desc: "主力机身，全画幅，色彩还原细腻" },
  { name: "Sony 35mm f/1.8", desc: "人文街拍必备，焦段自然，虚化柔和" },
  { name: "Sony 85mm f/1.8", desc: "人像焦段，背景虚化出色，肤色通透" },
  { name: "Sigma 24mm f/1.4", desc: "环境人像 & 风景广角，通勤首选" },
  { name: "柔光反射板", desc: "补光神器，让自然光更均匀" },
];

const STEPS = [
  { icon: "📍", title: "选定地点", desc: "根据主题和风格一起讨论取景地，室内 / 户外均可" },
  { icon: "💬", title: "沟通风格", desc: "通过参考图确定色调、构图偏好与服装搭配方向" },
  { icon: "📅", title: "确认档期", desc: "选好时间后支付定金，正式锁定拍摄日期" },
  { icon: "📷", title: "愉快拍摄", desc: "轻松的拍摄氛围，引导姿势与表情，发挥最自然的你" },
  { icon: "✨", title: "精心修图", desc: "按约定风格精修，每张照片都仔细调色处理" },
  { icon: "🎁", title: "交付成片", desc: "通过网盘交付原图 + 精修图，收藏珍贵记忆" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-rose-50">
      {/* ===== 顶部 Banner ===== */}
      <div className="relative h-56 sm:h-72 bg-gradient-to-br from-pink-300 via-fuchsia-200 to-purple-300 overflow-hidden">
        {/* 光晕装饰 */}
        <div className="absolute top-8 left-1/4 w-48 h-48 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute bottom-4 right-1/4 w-56 h-56 rounded-full bg-purple-200/30 blur-3xl" />

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
            关于我
          </h1>
          <p className="text-white/70 text-sm mt-1">About</p>
        </div>
      </div>

      {/* ===== 摄影师简介 ===== */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-10">
          {/* 头像 */}
          <div className="flex-shrink-0">
            <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gradient-to-br from-pink-300 via-fuchsia-200 to-purple-300 shadow-lg shadow-pink-200">
              <Image
                src="/about-avatar.jpg"
                alt="Sylvia 头像"
                fill
                className="object-cover"
              />
              {/* 图片不存在时的 emoji 占位 */}
              <div className="absolute inset-0 flex items-center justify-center text-4xl select-none pointer-events-none">
                📷
              </div>
            </div>
          </div>

          {/* 文字简介 */}
          <div className="text-center sm:text-left">
            <p className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-2">Photographer</p>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4"
              style={{ fontFamily: "var(--font-dancing, cursive)" }}
            >
              Sylvia
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm font-light">
              你好呀，我是 Sylvia，一个喜欢用镜头记录美好的摄影师。
              热爱旅行和光影，相信每一张照片都藏着一个故事。
              我擅长自然光人像与纪实风格，希望让每一次拍摄都成为轻松愉快的回忆。
              无论是日常写真、毕业季留念还是二次元周边收藏，都欢迎找我聊聊 ♡
            </p>
          </div>
        </div>
      </section>

      {/* 分隔装饰 */}
      <div className="py-4 text-center text-pink-200 tracking-[0.5em] text-xs select-none">
        ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦
      </div>

      {/* ===== 拍摄风格 ===== */}
      <section className="py-12 px-6 bg-gradient-to-b from-rose-50 to-fuchsia-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-3">Style</p>
            <h2 className="section-title text-2xl font-semibold text-gray-800">拍摄风格</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {STYLES.map((s) => (
              <div
                key={s.label}
                className={`bg-gradient-to-br ${s.color} px-6 py-3 rounded-2xl shadow-sm`}
              >
                <span className={`${s.text} font-medium text-sm`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 分隔装饰 */}
      <div className="py-4 bg-gradient-to-r from-pink-100 via-fuchsia-50 to-purple-100 text-center text-pink-300 tracking-[0.5em] text-xs select-none">
        ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦
      </div>

      {/* ===== 常用器材 ===== */}
      <section className="py-12 px-6 bg-gradient-to-b from-fuchsia-50 to-purple-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-purple-400 text-sm tracking-[0.3em] uppercase mb-3">Gear</p>
            <h2 className="section-title text-2xl font-semibold text-gray-800">常用器材</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GEAR.map((g) => (
              <div
                key={g.name}
                className="album-card bg-white rounded-2xl p-5 shadow-sm border border-pink-50"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{g.name}</p>
                    <p className="text-gray-500 text-xs mt-1 font-light">{g.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 分隔装饰 */}
      <div className="py-4 text-center text-pink-200 tracking-[0.5em] text-xs select-none">
        ✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧ &nbsp; ✦
      </div>

      {/* ===== 约拍流程 ===== */}
      <section className="py-12 px-6 bg-rose-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-3">Workflow</p>
            <h2 className="section-title text-2xl font-semibold text-gray-800">约拍流程</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="album-card bg-white rounded-2xl p-5 shadow-sm border border-pink-50 text-center"
              >
                <div className="text-3xl mb-3">{step.icon}</div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xs text-pink-300 font-light">STEP {i + 1}</span>
                </div>
                <p className="font-semibold text-gray-800 text-sm mb-1">{step.title}</p>
                <p className="text-gray-500 text-xs font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
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
