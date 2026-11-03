// DB 대신 쓰는 메모리 저장소 (서버 재시작 시 초기화됨)
// 개발 모드 HMR에서도 데이터가 유지되도록 globalThis에 보관한다.
import type { Todo } from './types';

const g = globalThis as unknown as { __todos?: Todo[]; __nextId?: number };

g.__todos ??= [
  { id: 1, title: 'React 이벤트 배우기', done: true },
  { id: 2, title: 'Next.js Route Handler 만들기', done: false },
  { id: 3, title: 'fetch로 API 호출하기', done: false },
];
g.__nextId ??= 4;

export function getTodos(): Todo[] {
  return g.__todos!;
}

export function addTodo(title: string): Todo {
  const id = g.__nextId ?? 4;
  g.__nextId = id + 1;
  const todo: Todo = { id, title, done: false };
  g.__todos!.push(todo);
  return todo;
}

export function updateTodo(id: number, patch: Partial<Omit<Todo, 'id'>>): Todo | null {
  const todo = g.__todos!.find((t) => t.id === id);
  if (!todo) return null;
  Object.assign(todo, patch);
  return todo;
}

export function removeTodo(id: number): boolean {
  const idx = g.__todos!.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  g.__todos!.splice(idx, 1);
  return true;
}
