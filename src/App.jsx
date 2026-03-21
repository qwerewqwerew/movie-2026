import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import api from "./api/axios";

export default function App() {
  const [now, setNow] = useState(null);
  const [popular, setPopular] = useState(null);
  const [topRated, setTopRated] = useState(null);

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
    api.get("movie/now_playing").then((res) => {
      setNow(res.data.results);
    });

    api.get("movie/popular").then((res) => {
      setPopular(res.data.results);
    });

    api.get("movie/top_rated").then((res) => {
      setTopRated(res.data.results);
    });
  }, []);

  // 3개 다 불러올 때까지 로딩
  const loading = now === null || popular === null || topRated === null;

  return (
    <>
      <Header />
      <Outlet context={{ now: now || [], popular: popular || [], topRated: topRated || [], loading }} />
      <Footer />
    </>
  );
}
