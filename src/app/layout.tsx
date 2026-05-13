import { Dancing_Script, Nunito } from "next/font/google";
import "./globals.css";
import FloatingBookButton from "./FloatingBookButton";
import { AuthProvider } from "@/context/AuthContext";

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata = {
  title: "Sylvia's Photography",
  description: "摄影约拍 | 用镜头记录美好瞬间",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh"
      className={`${dancingScript.variable} ${nunito.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-nunito">
        <AuthProvider>
          {children}
          <FloatingBookButton />
        </AuthProvider>
      </body>
    </html>
  );
}
