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

  // 영화 데이터 3가지를 동시에 불러오기 (각각 독립적으로 실패 허용)
  async function loadMovie() {
    try {
      const [res1, res2, res3] = await Promise.allSettled([
        api.get("movie/now_playing"),
        api.get("movie/popular"),
        api.get("movie/top_rated"),
      ]);
      if (res1.status === "fulfilled") setNow(res1.value.data.results);
      if (res2.status === "fulfilled") setPopular(res2.value.data.results);
      if (res3.status === "fulfilled") setTopRated(res3.value.data.results);
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
