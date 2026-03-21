import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card } from "./Card.jsx";
import api from "../api/axios";

// 카테고리 이름 한글 변환
const TITLES = {
  now_playing: "현재 상영작",
  popular: "인기 영화",
  top_rated: "최고 평점",
};

export function Category() {
  const { type } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // data에 type+page를 같이 저장해서 현재 요청과 맞는지 확인
  const [data, setData] = useState({ type: "", page: 0, movies: [] });

  // 영화 목록 불러오기
  useEffect(() => {
    api
      .get("movie/" + type, { params: { page: page } })
      .then((res) => {
        let pages = res.data.total_pages;
        if (pages > 20) {
          pages = 20;
        }
        setTotalPages(pages);
        setData({ type: type, page: page, movies: res.data.results });
      })
      .catch(() => {
        setData({ type: type, page: page, movies: [] });
      });
  }, [type, page]);

  // 아직 현재 type+page 데이터가 안 왔으면 로딩
  const loading = data.type !== type || data.page !== page;

  // 이전 버튼
  function goPrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  // 다음 버튼
  function goNext() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  const title = TITLES[type] || type;

  return (
    <section className="bg-black min-h-screen px-11 pt-28 pb-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>

        {loading && <p className="text-white text-xl">불러오는 중...</p>}

        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {data.movies.map((el) => (
                <Card key={el.id} item={el} />
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={goPrev}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-30 hover:bg-gray-700"
              >
                이전
              </button>
              <span className="text-white">
                {page} / {totalPages}
              </span>
              <button
                onClick={goNext}
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
