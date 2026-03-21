import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import api from "./api/axios";

// App — 데이터를 불러와서 하위 페이지에 전달하는 레이아웃
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
    } catch (err) {
      console.error("영화 데이터 로드 실패:", err);
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
