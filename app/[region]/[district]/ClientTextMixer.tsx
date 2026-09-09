"use client";

import { useEffect, useState } from "react";

export default function ClientTextMixer({ locationText }: { locationText: string }) {
  // 1. 크롤러/초기 로딩 시 자연스럽고 안전한 텍스트
  const [keywordText, setKeywordText] = useState(
    `${locationText} 무드앤휴 전문 홈케어 힐링 테라피`
  );

  useEffect(() => {
    // 2. 브라우저 마운트 후 자연스러운 타겟 믹스 키워드로 교체
    setKeywordText(`${locationText} 프리미엄 방문 힐링 케어 & 프라이빗 바디 테라피`);
  }, [locationText]);

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/25 p-4 rounded-2xl text-center shadow-inner">
      <p className="text-xs md:text-sm font-bold text-amber-300 tracking-wide">
        ✨ {keywordText}
      </p>
    </div>
  );
}