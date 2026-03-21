import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Card } from "./Card.jsx";
import api from "../api/axios";

// Search — 검색 결과 페이지
export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 검색어가 바뀔 때마다 API 호출 (이전 요청 무시)
  useEffect(() => {
    if (!query) return;
    let cancelled = false;
    setLoading(true); // eslint-disable-line react-hooks/set-state-in-effect -- data fetch init
    api
      .get("search/movie", { params: { query } })
      .then((res) => { if (!cancelled) setResults(res.data.results); })
      .catch(() => { if (!cancelled) setResults([]); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [query]);

  // query가 비면 결과 초기화 (렌더 중 파생 — effect 불필요)
  const displayResults = query ? results : [];

  return (
    <section className="bg-black min-h-screen px-11 pt-28 pb-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          &ldquo;<span className="text-yellow-400">{query}</span>&rdquo; 검색 결과
        </h2>

        {loading && <p className="text-white text-xl">검색 중...</p>}

        {!loading && query && displayResults.length === 0 && (
          <p className="text-gray-400 text-xl">검색 결과가 없습니다.</p>
        )}

        {!loading && !query && (
          <p className="text-gray-400 text-xl">검색어를 입력해 주세요.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {displayResults.map((el) => (
            <Card key={el.id} item={el} />
          ))}
        </div>
      </div>
    </section>
  );
}
