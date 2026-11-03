'use client';

import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Todo } from '@/lib/types';

// axios 버전 Todo : TodoFetch.tsx 와 나란히 비교해 보세요.
export default function TodoAxios() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  function handleError(e: unknown) {
    if (axios.isAxiosError(e)) {
      setError(`${e.response?.status ?? ''} ${e.response?.data?.error ?? e.message}`);
    } else {
      setError(String(e));
    }
  }

  // 초기 목록: GET
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<Todo[]>('/todos'); // res.ok 체크, .json() 불필요
        setTodos(data);
      } catch (e) {
        handleError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 추가: POST (body는 객체 그대로, JSON.stringify 불필요)
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const { data } = await api.post<Todo>('/todos', { title });
      setTodos((prev) => [...prev, data]);
      setTitle('');
      setError(null);
    } catch (e) {
      handleError(e);
    }
  }

  // 토글: PATCH
  async function toggle(todo: Todo) {
    try {
      const { data } = await api.patch<Todo>(`/todos/${todo.id}`, { done: !todo.done });
      setTodos((prev) => prev.map((t) => (t.id === data.id ? data : t)));
    } catch (e) {
      handleError(e);
    }
  }

  // 삭제: DELETE
  async function remove(id: number) {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      handleError(e);
    }
  }

  // 에러 시연용: axios는 404에서 자동으로 throw → try/catch 하나로 처리
  async function triggerError() {
    try {
      await api.delete('/todos/9999');
    } catch (e) {
      handleError(e);
    }
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
                  e.stopPropagation();
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
