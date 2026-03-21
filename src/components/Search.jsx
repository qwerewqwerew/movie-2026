import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import api from "../api/axios";
import { Card } from "./Card.jsx";

export function Search() {
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
