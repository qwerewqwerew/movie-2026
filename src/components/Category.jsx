import { useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "../api/axios";
import { Card } from "./Card.jsx";

const TITLES = {
  now_playing: "현재 상영작",
  popular: "인기 영화",
  top_rated: "최고 평점",
};

export function Category() {
  const { type } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

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
