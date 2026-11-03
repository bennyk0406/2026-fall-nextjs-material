// 일정 시간 후에 렌더링되는 비동기 서버 컴포넌트 (느린 API 응답을 흉내)
async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function SlowCard({ title, ms }: { title: string; ms: number }) {
  await wait(ms);
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{ms}ms 뒤에 로딩 완료 ✅</p>
    </div>
  );
}
