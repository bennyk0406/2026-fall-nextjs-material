'use client';

import { useEffect, useRef, useState } from 'react';

export default function GlobalEventPage() {
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const popRef = useRef<HTMLDivElement>(null);

  // Example 1: 스크롤
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll); // cleanup!
  }, []);

  // Example 2: 팝오버 바깥 클릭 시 닫기
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  // Example 3: 마우스 위치
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div className="badge">scrollY: {Math.round(scrollY)}</div>

      <h1>6. 전역 이벤트</h1>
      <p className="desc">하나의 컴포넌트에 종속되지 않는 이벤트: 스크롤, 마우스 위치, 바깥 클릭 등</p>

      <h3>Example 1 · 스크롤 (우측 상단 배지 확인)</h3>
      <h3>Example 2 · Pop Over</h3>
      <div className="popover-wrap" ref={popRef}>
        <button onClick={() => setOpen((v) => !v)}>팝오버 열기</button>
        {open && <div className="popover">바깥을 클릭하면 닫혀요 👋</div>}
      </div>

      <h3>Example 3 · 마우스 위치</h3>
      <p>
        x: {pos.x}, y: {pos.y}
      </p>

      <div className="spacer">↓ 스크롤 영역 ↓</div>
    </>
  );
}
