import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://mood-hue.netlify.app"),
  title: "무드앤휴 | 서울·경기·인천 24시 방문 홈케어 & 힐링 테라피 안내",
  description: "서울·경기·인천 25분 내 빠른 방문! 선입금 없는 100% 안심 후불제 테라피 예약.",
  openGraph: {
    title: "무드앤휴 | 서울·경기·인천 24시 방문 홈케어 추천",
    description: "선입금 없는 100% 후불 안심 케어! 수도권 전지역 25분 내 빠른 방문 바디케어 안내.",
    url: "https://mood-hue.netlify.app",
    siteName: "무드앤휴",
    locale: "ko_KR",
    type: "website",
  },
  verification: {
    other: {
      "naver-site-verification": "e08c15021056a969d7c5e807a12a0f3795a4778c",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <NavigationHeader />
        {children}
      </body>
    </html>
  );
}