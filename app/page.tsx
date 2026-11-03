import Link from 'next/link';

const demos = [
  { href: '/event/basic', title: '1. 기본 이벤트', sub: 'Lec03 · onClick / onChange / onKeyDown' },
  { href: '/event/bubbling', title: '2. 이벤트 버블링', sub: 'Lec03 · 부모로 전파, e.target, 이벤트 위임' },
  { href: '/event/stop', title: '3. stopPropagation', sub: 'Lec03 · 카드 안의 삭제 버튼' },
  { href: '/event/capture', title: '4. 이벤트 캡처링', sub: 'Lec03 · onClickCapture' },
  { href: '/event/prevent', title: '5. preventDefault', sub: 'Lec03 · form submit, a 태그' },
  { href: '/event/global', title: '6. 전역 이벤트', sub: 'Lec03 · scroll / 바깥 클릭 / mousemove + useEffect' },
  { href: '/todos', title: '7-1. Todo 앱 (fetch)', sub: 'Lec04 · Route Handler + fetch' },
  { href: '/todos/axios', title: '7-2. Todo 앱 (axios)', sub: 'Lec04 · 같은 API를 axios로' },
  { href: '/suspense/before', title: '8-1. Suspense 없이', sub: 'Lec04 · 가장 느린 카드가 끝날 때까지 전체 대기' },
  { href: '/suspense', title: '8-2. Suspense 적용', sub: 'Lec04 · 카드별로 독립 로딩' },
];

export default function Home() {
  return (
    <>
      <h1>React with Next.js · 강의 데모</h1>
      <p className="desc">Event(Lec03) / API(Lec04) 데모 모음</p>
      <ul className="demo-list">
        {demos.map((d) => (
          <li key={d.href}>
            <Link href={d.href}>
              {d.title}
              <small>{d.sub}</small>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
