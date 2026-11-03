// ❌ 잘못된 RESTful 설계 예시 (수업 비교용)
// 삭제를 POST로 받고, URL에 행위(delete)가 포함되어 있음 → 올바른 설계: DELETE /api/todos/:id
import { NextResponse } from 'next/server';
import { removeTodo } from '@/lib/todos';

export async function POST(req: Request) {
  const { id } = await req.json();
  const ok = removeTodo(Number(id));
  return NextResponse.json({ success: ok });
}
