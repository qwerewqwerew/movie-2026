import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import api from "./api/axios";

export default function App() {
  const [now, setNow] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  // 영화 데이터 3가지를 동시에 불러오기
  async function loadMovie() {
    try {
      const [res1, res2, res3] = await Promise.all([
        api.get("movie/now_playing"),
        api.get("movie/popular"),
        api.get("movie/top_rated"),
      ]);
      setNow(res1.data.results);
      setPopular(res2.data.results);
      setTopRated(res3.data.results);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovie();
  }, []);

  return (
    <>
      <Header />
      <Outlet context={{ now, popular, topRated, loading }} />
      <Footer />
    </>
  );
}

// ──────────────────────────────────────
// Header — 상단 네비게이션 바
// ──────────────────────────────────────
function Header() {
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 스크롤 위치에 따라 헤더 배경 변경
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 검색 폼 제출
  function handleSearch(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setQuery("");
    setMenuOpen(false);
  }

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/95 shadow-lg" : "bg-black/30"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <span className="text-2xl font-bold text-yellow-400">GOFLEX</span>
        </Link>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>

        {/* 데스크톱 네비게이션 */}
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="영화 검색..."
              className="bg-gray-800 text-white px-3 py-1.5 rounded-l-md text-sm outline-none placeholder-gray-400 w-40 md:w-56"
            />
            <button type="submit" className="bg-yellow-400 text-black px-3 py-1.5 rounded-r-md hover:bg-yellow-300">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          <Link to="/" className="text-white hover:text-yellow-400">
            <FontAwesomeIcon icon={faHouse} className="text-xl" />
          </Link>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 px-6 pb-4 flex flex-col gap-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="영화 검색..."
              className="bg-gray-800 text-white px-3 py-1.5 rounded-l-md text-sm outline-none placeholder-gray-400 flex-1"
            />
            <button type="submit" className="bg-yellow-400 text-black px-3 py-1.5 rounded-r-md hover:bg-yellow-300">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          <Link to="/" onClick={() => setMenuOpen(false)} className="text-white hover:text-yellow-400 flex items-center gap-2">
            <FontAwesomeIcon icon={faHouse} /> 홈
          </Link>
        </div>
      )}
    </header>
  );
}

// ──────────────────────────────────────
// Footer — 하단 푸터
// ──────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-6 text-center">
        <span className="text-xl font-bold text-yellow-400">GOFLEX</span>
        <p className="text-gray-500 text-sm mt-2">
          이 사이트는 TMDB API를 사용하며, TMDB의 승인 또는 인증을 받지 않았습니다.
        </p>
        <p className="text-gray-600 text-xs mt-4">© 2026 GOFLEX. All rights reserved.</p>
      </div>
    </footer>
  );
}
