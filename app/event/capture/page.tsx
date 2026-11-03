'use client';

import { useState } from 'react';
import LogPanel from '@/components/LogPanel';

export default function CapturePage() {
  const [logs, setLogs] = useState<string[]>([]);
  const log = (msg: string) => setLogs((prev) => [...prev, msg]);
  const [blockAtParent, setBlockAtParent] = useState(false);

  return (
    <>
      <h1>4. 이벤트 캡처링</h1>
      <p className="desc">부모에서 발생한 이벤트를 자식에게 전파. 자식보다 먼저 잡아서 interrupt 해야 할 때 사용.</p>

      <label>
        <input type="checkbox" checked={blockAtParent} onChange={(e) => setBlockAtParent(e.target.checked)} />{' '}
        parent의 캡처 단계에서 stopPropagation
      </label>

      <div
        className="box parent"
        style={{ marginTop: 12 }}
        onClickCapture={(e) => {
          log('parent (capture)');
          if (blockAtParent) e.stopPropagation();
        }}
        onClick={() => log('parent (bubble)')}
      >
        <span>Parent</span>
        <div
          className="box child"
          onClickCapture={() => log('child (capture)')}
          onClick={() => log('child (bubble)')}
        >
          <span>Child</span>
          <div
            className="box grandchild"
            onClickCapture={() => log('grandchild (capture)')}
            onClick={() => log('grandchild (bubble)')}
          >
            <span>Grandchild (여기를 클릭)</span>
          </div>
        </div>
      </div>
      <LogPanel logs={logs} onClear={() => setLogs([])} />
    </>
  );
}
