'use client';

import { useState } from 'react';

export default function BasicEventPage() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>1. 기본 이벤트</h1>
      <p className="desc">React에서 이벤트 관련 prop은 항상 on으로 시작한다.</p>

      <div className="row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') alert(`Enter! ${text}`);
          }}
          placeholder="입력해보세요"
        />
        <button className="primary" onClick={() => setCount((c) => c + 1)}>
          클릭 {count}
        </button>
      </div>
      <p>입력값: {text}</p>
    </>
  );
}
