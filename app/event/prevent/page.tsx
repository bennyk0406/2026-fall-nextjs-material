'use client';

import { useState } from 'react';

export default function PreventDefaultPage() {
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const [usePrevent, setUsePrevent] = useState(false);

  return (
    <>
      <h1>5. preventDefault</h1>
      <p className="desc">모든 이벤트는 브라우저의 기본 동작을 갖는다. 직접 정의한 동작을 넣고 싶다면 막아야 한다.</p>

      <label>
        <input type="checkbox" checked={usePrevent} onChange={(e) => setUsePrevent(e.target.checked)} />{' '}
        preventDefault 사용
      </label>

      <form
        onSubmit={(e) => {
          if (!usePrevent) return; // 막지 않으면 → 브라우저 기본 동작(새로고침)이 실행됨
          e.preventDefault();
          if (!value.trim()) return;
          setSubmitted((prev) => [...prev, value]);
          setValue('');
        }}
      >
        <div className="row">
          <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="내용 입력 후 Enter" />
          <button type="submit" className="primary">제출</button>
        </div>
      </form>
      <ul>
        {submitted.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <p style={{ marginTop: 32 }}>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (usePrevent) {
              e.preventDefault();
              alert('이동을 막았습니다');
            }
          }}
        >
          example.com으로 이동하는 링크
        </a>
      </p>
    </>
  );
}
