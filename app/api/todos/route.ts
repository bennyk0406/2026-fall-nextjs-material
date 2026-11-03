import { NextResponse } from 'next/server';
import { addTodo, getTodos } from '@/lib/todos';

// GET /api/todos → 목록 조회
export async function GET() {
  return NextResponse.json(getTodos());
}

// POST /api/todos → 새 todo 생성
export async function POST(req: Request) {
  const { title } = await req.json();
  if (!title || typeof title !== 'string') {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }
  return NextResponse.json(addTodo(title), { status: 201 });
}
