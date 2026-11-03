'use client';

import { FormEvent, useEffect, useState } from 'react';
import type { Todo } from '@/lib/types';

// fetch 버전 Todo : 개발자 도구 Network 탭을 열어두고 시연하세요.
export default function TodoFetch() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 초기 목록: GET
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/todos');
        if (!res.ok) throw new Error(`HTTP ${res.status}`); // fetch는 404/500에서 throw 하지 않는다!
        setTodos(await res.json());                          // .json()으로 변환
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 추가: POST
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) return setError(`HTTP ${res.status}`);
    const created: Todo = await res.json();
    setTodos((prev) => [...prev, created]);
    setTitle('');
    setError(null);
  }

  // 토글: PATCH
  async function toggle(todo: Todo) {
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !todo.done }),
    });
    if (!res.ok) return setError(`HTTP ${res.status}`);
    const updated: Todo = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  // 삭제: DELETE
  async function remove(id: number) {
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    if (!res.ok) return setError(`HTTP ${res.status}`);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  // 에러 시연용: 존재하지 않는 id 삭제 → 404
  async function triggerError() {
    const res = await fetch('/api/todos/9999', { method: 'DELETE' });
    if (!res.ok) setError(`HTTP ${res.status} (존재하지 않는 id)`);
  }

  return (
    <>
      {error && <p className="error">에러: {error}</p>}
      <form onSubmit={handleSubmit} className="row">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="할 일을 입력하세요" />
        <button type="submit" className="primary">추가</button>
        <button type="button" onClick={triggerError}>404 에러 내보기</button>
      </form>

      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <ul className="todo-list">
          {todos.map((t) => (
            <li key={t.id} className={`todo-item ${t.done ? 'done' : ''}`} onClick={() => toggle(t)}>
              <span>{t.title}</span>
              <button
                className="danger"
                onClick={(e) => {
                  e.stopPropagation(); // 삭제 클릭이 li의 토글로 전파되지 않도록
                  remove(t.id);
                }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
