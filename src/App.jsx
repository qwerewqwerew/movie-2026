import { useState, useEffect } from "react";
import api from "./api/axios";
import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

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
