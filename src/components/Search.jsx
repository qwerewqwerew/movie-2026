import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Card } from "./Card.jsx";
import api from "../api/axios";
import { Spinner, Container } from "./UI.jsx";

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  // data에 query를 같이 저장해서 현재 검색어와 맞는지 확인
  const [data, setData] = useState({ query: "", results: [] });

  // 검색어가 바뀌면 API 호출
  useEffect(() => {
    if (!query) return;

    api
      .get("search/movie", { params: { query: query } })
      .then((res) => {
        setData({ query: query, results: res.data.results.filter((m) => m.poster_path) });
      })
      .catch(() => {
        setData({ query: query, results: [] });
      });
  }, [query]);

  // 아직 현재 검색어에 대한 결과가 안 왔으면 로딩
  const loading = query && data.query !== query;
  const items = data.query === query ? data.results : [];

  return (
    <Container className="min-h-screen pt-28 pb-16">
      <h2 className="text-3xl font-bold text-white mb-8">
        &ldquo;<span className="text-yellow-400">{query}</span>&rdquo; 검색 결과
      </h2>

      {loading && <Spinner message="검색 중..." />}

      {!loading && query && items.length === 0 && (
        <p className="text-gray-400 text-xl">검색 결과가 없습니다.</p>
      )}

      {!query && (
        <p className="text-gray-400 text-xl">검색어를 입력해 주세요.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((el) => (
          <Card key={el.id} item={el} />
        ))}
      </div>
    </Container>
  );
}
