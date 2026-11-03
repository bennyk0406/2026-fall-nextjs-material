'use client';

import { useState } from 'react';
import LogPanel from '@/components/LogPanel';

const TECHS = ['React', 'Next.js', 'TypeScript', 'Tailwind'];

export default function BubblingPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const log = (msg: string) => setLogs((prev) => [...prev, msg]);

  const [selected, setSelected] = useState<string | null>(null);
  const [info, setInfo] = useState('');

  return (
    <>
      <h1>2. 이벤트 버블링</h1>
      <p className="desc">발생한 이벤트가 부모 요소로 전파되며, 각 요소의 handler가 모두 실행된다.</p>

      <h3>A. 중첩된 박스</h3>
      <div className="box parent" onClick={() => log('parent')}>
        <span>Parent</span>
        <div className="box child" onClick={() => log('child')}>
          <span>Child</span>
          <div className="box grandchild" onClick={() => log('grandchild')}>
            <span>Grandchild (여기를 클릭)</span>
          </div>
        </div>
      </div>
      <LogPanel logs={logs} onClear={() => setLogs([])} />

      <h3 style={{ marginTop: 32 }}>B. 이벤트 위임 (Search Bar 예제와 같은 구조)</h3>
      <ul
        className="chips"
        onClick={(e) => {
          const target = e.target as HTMLElement;         // 실제로 클릭된 요소
          const current = e.currentTarget as HTMLElement; // handler가 달린 요소
          setInfo(`target: <${target.tagName.toLowerCase()}>, currentTarget: <${current.tagName.toLowerCase()}>`);
          const id = target.dataset.id;
          if (id) setSelected(id);
        }}
      >
        {TECHS.map((t) => (
          <li key={t} data-id={t} className={selected === t ? 'selected' : ''}>
            {t}
          </li>
        ))}
      </ul>
      <p>선택된 값: {selected ?? '없음'}</p>
      <p style={{ color: '#6b7280', fontSize: 14 }}>{info}</p>
    </>
  );
}
