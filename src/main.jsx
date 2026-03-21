import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { Home } from "./components/Home.jsx";
import { MovieDetail } from "./components/MovieDetail.jsx";
import { Card } from "./components/Card.jsx";
import { ErrorPage } from "./ErrorPage.jsx";
import api from "./api/axios";

import {
  createBrowserRouter,
  RouterProvider,
  useSearchParams,
  useParams,
} from "react-router";

// ──────────────────────────────────────
// Search — 검색 결과 페이지
// ──────────────────────────────────────
function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 검색어가 바뀔 때마다 API 호출
  useEffect(() => {
    if (!query) return;
    setLoading(true);
    api
      .get("search/movie", { params: { query } })
      .then((res) => setResults(res.data.results))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <section className="bg-black min-h-screen px-11 pt-28 pb-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          "<span className="text-yellow-400">{query}</span>" 검색 결과
        </h2>

        {loading && <p className="text-white text-xl">검색 중...</p>}

        {!loading && results.length === 0 && (
          <p className="text-gray-400 text-xl">검색 결과가 없습니다.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((el) => (
            <Card key={el.id} item={el} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────
// Category — 카테고리별 전체 목록 + 페이지네이션
// ──────────────────────────────────────
const TITLES = {
  now_playing: "현재 상영작",
  popular: "인기 영화",
  top_rated: "최고 평점",
};

function Category() {
  const { type } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // 카테고리나 페이지가 바뀌면 API 호출
  useEffect(() => {
    setLoading(true);
    api
      .get(`movie/${type}`, { params: { page } })
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(Math.min(res.data.total_pages, 20));
      })
      .finally(() => setLoading(false));
  }, [type, page]);

  // 카테고리가 바뀌면 1페이지로 초기화
  useEffect(() => {
    setPage(1);
  }, [type]);

  const title = TITLES[type] || type;

  return (
    <section className="bg-black min-h-screen px-11 pt-28 pb-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>

        {loading && <p className="text-white text-xl">불러오는 중...</p>}

        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {movies.map((el) => (
                <Card key={el.id} item={el} />
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-30 hover:bg-gray-700"
              >
                이전
              </button>
              <span className="text-white">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-30 hover:bg-gray-700"
              >
                다음
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// ──────────────────────────────────────
// 라우터 설정
// ──────────────────────────────────────
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "movie/:id", element: <MovieDetail /> },
      { path: "search", element: <Search /> },
      { path: "category/:type", element: <Category /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
