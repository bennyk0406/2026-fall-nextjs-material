'use client';

// 이벤트 발생 순서를 화면에 보여주는 공용 로그 패널 (console.log 대신 사용)
export default function LogPanel({
  logs,
  onClear,
}: {
  logs: string[];
  onClear: () => void;
}) {
  return (
    <div className="log">
      <div className="log-head">
        <strong>Event Log</strong>
        <button onClick={onClear}>지우기</button>
      </div>
      <ol>
        {logs.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ol>
    </div>
  );
}
