import { NextResponse } from 'next/server';
import { removeTodo, updateTodo } from '@/lib/todos';

// Next 15+ : params는 Promise
type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/todos/:id → 일부 수정 (done 토글 등)
export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  const patch = await req.json();
  const todo = updateTodo(Number(id), patch);
  if (!todo) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(todo);
}

// DELETE /api/todos/:id → 삭제
export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const ok = removeTodo(Number(id));
  if (!ok) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return new Response(null, { status: 204 });
}
