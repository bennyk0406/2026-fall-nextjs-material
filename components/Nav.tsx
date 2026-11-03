import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/">🏠 Home</Link>
      <Link href="/event/basic">기본</Link>
      <Link href="/event/bubbling">버블링</Link>
      <Link href="/event/stop">stopPropagation</Link>
      <Link href="/event/capture">캡처링</Link>
      <Link href="/event/prevent">preventDefault</Link>
      <Link href="/event/global">전역 이벤트</Link>
      <Link href="/todos">Todo(fetch)</Link>
      <Link href="/todos/axios">Todo(axios)</Link>
      <Link href="/suspense">Suspense</Link>
    </nav>
  );
}
