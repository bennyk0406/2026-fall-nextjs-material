import TodoAxios from '@/components/TodoAxios';

export default function TodosAxiosPage() {
  return (
    <>
      <h1>7-2. Todo 앱 (axios)</h1>
      <p className="desc">같은 API, 같은 UI. fetch 버전과 코드를 비교해 보세요.</p>
      <TodoAxios />
    </>
  );
}
