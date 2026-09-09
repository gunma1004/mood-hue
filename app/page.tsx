import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

export const metadata: Metadata = {
  title: "무드앤휴 | 서울·경기·인천 24시 방문 홈케어 & 힐링 테라피 안내",
  // 💡 네이버 80자 이내 기준 충족 (공백 포함 51자)
  description: "서울·경기·인천 25분 내 빠른 방문! 선입금 없는 100% 안심 후불제 테라피 예약.",
  keywords: [
    "서울 홈케어",
    "경기 홈케어",
    "인천 홈케어",
    "수도권 방문 테라피",
    "출장 마사지",
    "후불제 바디케어",
    "24시 힐링 케어",
    "무드앤휴"
  ],
  openGraph: {
    title: "무드앤휴 | 서울·경기·인천 24시 방문 홈케어 추천",
    description: "선입금 없는 100% 후불 안심 케어! 수도권 전지역 25분 내 빠른 방문 바디케어 안내.",
    url: "https://mood-hue.netlify.app",
    siteName: "무드앤휴",
    locale: "ko_KR",
    type: "website",
  },
};

export default function Page() {
  return <MainClientUI />;
}