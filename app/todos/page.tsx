import TodoFetch from '@/components/TodoFetch';

export default function TodosPage() {
  return (
    <>
      <h1>7-1. Todo 앱 (fetch)</h1>
      <p className="desc">개발자 도구(F12) → Network 탭을 열어두고 추가/토글/삭제를 눌러보세요.</p>
      <TodoFetch />
    </>
  );
}
