"use client";

import { useEffect, useState, useRef } from "react";

const ScrollProgressCircle = () => {
  // 현재 스크롤 진행도 관리
  const [scrollProgress, setScrollProgress] = useState(0);
  // 애니메이션 프레임 요청 참조
  const requestRef = useRef<number | null>(null);

  // 원의 반지름
  const circleRadius = 40;
  // 원의 둘레 = 2 * 3.14 * 반지름
  const circleCircumference = 2 * Math.PI * circleRadius;

  // 스크롤 진행도를 계산하는 함수
  const calculateScrollProgress = () => {
    // 현재 스크롤 위치
    const scrollTop = window.scrollY;
    // 스크롤 가능한 총 높이
    const scrollHeight = document.documentElement.scrollHeight;
    // 현재 보이는 브라우저 높이
    const clientHeight = document.documentElement.clientHeight;

    // 스크롤 가능한 총 높이
    const scrollableHeight = scrollHeight - clientHeight;

    // 스크롤 진행도 계산 (0에서 1 사이의 값)
    // 스크롤 가능한 총 높이가 0보다 크면 스크롤 진행도(0~1 사이의 숫자)를 계산하고, 0이면 0을 반환
    return scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
  };

  useEffect(() => {
    // 애니메이션 프레임 처리 함수
    const animateScroll = () => {
      // 현재 스크롤 진행도 계산 ex) 절반 내려왔다면 0.5
      const progress = calculateScrollProgress();
      setScrollProgress(progress);

      // 다음 프레임 요청
      requestRef.current = requestAnimationFrame(animateScroll);
    };

    // 컴포넌트 마운트 시 애니메이션 시작
    requestRef.current = requestAnimationFrame(animateScroll);

    // 컴포넌트 언마운트 시 애니메이션 정리
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // 원이 얼마나 보일지 계산 (0일수록 더 많이 보임)
  const strokeDashoffset = circleCircumference * (1 - scrollProgress);

  return (
    <div className="fixed right-8 bottom-8 z-50">
      <svg width="100" height="100" viewBox="0 0 100 100">
        {/* 배경 원 (회색) */}
        <circle
          // 원의 x좌표 (중심)
          cx="50"
          // 원의 y좌표 (중심)
          cy="50"
          // 원의 반지름
          r={circleRadius}
          // 원의 내부 색깔 (투명)
          fill="transparent"
          // 원의 테두리 색깔 (회색)
          stroke="#e6e6e6"
          // 원의 테두리 두께
          strokeWidth="4"
        />

        {/* 진행도 원 (컬러) */}
        <circle
          // 원의 x좌표 (중심) -> 위 원과 같은 위치에 있음
          cx="50"
          // 원의 y좌표 (중심) -> 위 원과 같은 위치에 있음
          cy="50"
          // 원의 반지름
          r={circleRadius}
          // 원의 내부 색깔 (투명)
          fill="transparent"
          // 원의 테두리 색깔 (파란색)
          stroke="#3b82f6"
          // 원의 테두리 두께
          strokeWidth="4"
          // 원의 전체 둘레 길이
          strokeDasharray={circleCircumference}
          // 0이면 안숨김
          // 숫자가 클수록 숨겨짐
          strokeDashoffset={strokeDashoffset}
          // 테두리 끝 모양 (둥글게)
          strokeLinecap="round"
          // 원의 시작점을 12시 방향으로 조정
          // 원래 위치는 시계 3시 방향
          transform="rotate(-90 50 50)"
        />

        {/* 가운데 스크롤 진행률 텍스트 (선택사항) */}
        <text
          // 텍스트의 x좌표 (중심)
          x="50"
          // 텍스트의 y좌표 (중심)
          y="55"
          // 텍스트 정렬 방식 (가운데 정렬)
          textAnchor="middle"
          // 텍스트 크기
          fontSize="14"
          // 텍스트 색깔 (파란색)
          fill="#3b82f6"
          // 텍스트 두께 (굵게)
          fontWeight="bold"
        >
          {Math.round(scrollProgress * 100)}%
        </text>
      </svg>
    </div>
  );
};

export default ScrollProgressCircle;
