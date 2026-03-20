# GOFLEX - 영화 정보 앱

TMDB API를 활용한 영화 정보 웹앱입니다.

## 기술 스택

- React 19
- Vite 8
- React Router 7
- Tailwind CSS 4
- Axios
- FontAwesome

## 시작하기

`.env` 파일에 TMDB API 키를 설정합니다.

```
VITE_TMDB_API_KEY=여기에_API_키_입력
```

```bash
npm install
npm run dev
```

---

## 작업 기록

### 1단계: Header 완성 (2026-03-20)

**파일:** `src/components/Header.jsx`

**변경 전**
- 홈 아이콘만 존재, 링크 없음
- `bg-amber-800` 불필요한 배경색 적용
- "Header" 텍스트만 출력

**변경 후**
- GOFLEX 브랜드 로고 좌측 배치, `/` 링크 연결
- 홈 아이콘 우측 배치, hover 시 노란색으로 변경
- `z-50` 추가로 다른 요소 위에 고정 헤더 표시
- `bg-amber-800` 제거

**Before / After 코드**

Before:
```jsx
export function Header() {
  return (
    <header className="bg-black/50 fixed w-full top-0 left-0">
      <div className="container mx-auto bg-amber-800">
        <FontAwesomeIcon icon={faHouse} className="text-orange-400" />
      </div>
      <div>Header</div>
    </header>
  );
}
```

After:
```jsx
export function Header() {
  return (
    <header className="bg-black/70 fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/">
          <span className="text-2xl font-bold text-yellow-400">GOFLEX</span>
        </Link>
        <Link to="/" className="text-white hover:text-yellow-400">
          <FontAwesomeIcon icon={faHouse} className="text-xl" />
        </Link>
      </div>
    </header>
  );
}
```
