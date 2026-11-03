// ❌ 잘못된 RESTful 설계 예시 (수업 비교용)
// URL에 행위(get)가 포함되어 있음 → 올바른 설계: GET /api/todos/:id
import { NextResponse } from 'next/server';
import { getTodos } from '@/lib/todos';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const todo = getTodos().find((t) => t.id === Number(id));
  if (!todo) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(todo);
}
