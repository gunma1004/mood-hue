import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "무드앤휴 | 서울·경기·인천 방문 홈케어 & 힐링 테라피",
  description: "25분 내 신속 방문, 100% 안심 후불제 프라이빗 바디 테라피 안내.",
  openGraph: {
    title: "무드앤휴 | 서울·경기·인천 방문 홈케어 & 힐링 테라피",
    description: "25분 내 신속 방문, 100% 안심 후불제 프라이빗 바디 테라피 안내.",
    url: "https://mood-hue.netlify.app",
    siteName: "무드앤휴",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 🌟 네이버 서치어드바이저 사이트 소유확인 메타태그 */}
        <meta
          name="naver-site-verification"
          content="d70c70499cba61c8b398799cbb4e022c277ab2c8"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-[#050505] text-gray-100 antialiased selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}