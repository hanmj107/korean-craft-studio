import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PracticeNotice } from "@/components/PracticeNotice";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "온결 공방", template: "%s | 온결 공방" },
  description:
    "도자기, 나전칠기, 보자기, 목공예. 결을 살린 한국 공예를 만나는 온결 공방 (실습용 프로토타입).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <PracticeNotice variant="banner" />
        <main
          id="main"
          className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
