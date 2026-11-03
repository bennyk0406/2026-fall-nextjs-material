'use client';

import { useState } from 'react';

export default function StopPropagationPage() {
  const [cardClicks, setCardClicks] = useState(0);
  const [deleteClicks, setDeleteClicks] = useState(0);
  const [useStop, setUseStop] = useState(false);

  return (
    <>
      <h1>3. stopPropagation</h1>
      <p className="desc">부모 컴포넌트에 중요한 이벤트가 있을 때, 자식의 이벤트가 전파되는 것을 막는다.</p>

      <label>
        <input type="checkbox" checked={useStop} onChange={(e) => setUseStop(e.target.checked)} />{' '}
        stopPropagation 사용
      </label>

      <div className="card clickable" onClick={() => setCardClicks((c) => c + 1)}>
        <h3>📦 클릭 가능한 카드 (상세 보기)</h3>
        <p>카드 클릭 횟수: {cardClicks}</p>
        <p>삭제 클릭 횟수: {deleteClicks}</p>
        <button
          className="danger"
          onClick={(e) => {
            if (useStop) e.stopPropagation();
            setDeleteClicks((c) => c + 1);
          }}
        >
          삭제
        </button>
      </div>
      <p style={{ color: '#6b7280', fontSize: 14 }}>
        체크 해제 상태에서 삭제를 누르면 카드 클릭 횟수도 같이 올라갑니다.
      </p>
    </>
  );
}
