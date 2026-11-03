import SlowCard from '@/components/SlowCard';

export const dynamic = 'force-dynamic';

// Suspense 없이: 가장 느린 카드(3초)가 끝날 때까지 페이지 전체가 비어 있다.
export default function SuspenseBeforePage() {
  return (
    <>
      <h1>8-1. Suspense 없이</h1>
      <p className="desc">A는 1초, B는 3초 걸리지만 둘 다 3초 뒤에 한꺼번에 나타납니다.</p>
      <SlowCard title="카드 A (빠름)" ms={1000} />
      <SlowCard title="카드 B (느림)" ms={3000} />
    </>
  );
}
