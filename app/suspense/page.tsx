import { Suspense } from 'react';
import SlowCard from '@/components/SlowCard';

// export const dynamic = 'force-dynamic';

export default function SuspensePage() {
  return (
    <>
      <h1>8-2. Suspense 적용</h1>
      <p className="desc">각 카드가 준비되는 대로 독립적으로 나타나고, 그 전에는 fallback UI가 보입니다.</p>

      <Suspense fallback={<div className="card">⏳ A 로딩 중...</div>}>
        <SlowCard title="카드 A (빠름)" ms={1000} />
      </Suspense>
      <Suspense fallback={<div className="card">⏳ B 로딩 중...</div>}>
        <SlowCard title="카드 B (느림)" ms={3000} />
      </Suspense>
      <Suspense fallback={<div className="card">⏳ A, B 로딩 중...</div>}>
        <SlowCard title="카드 A (빠름)" ms={1000} />
        <SlowCard title="카드 B (느림)" ms={3000} />
      </Suspense>
    </>
  );
}
