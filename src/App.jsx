import { useState, useEffect } from "react";
import api from "./api/axios";
import { Outlet } from "react-router";
import { Header } from "./components/Header";

export default function App() {
  const [now, setNow] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);

  async function loadMovie() {
    const [res1, res2, res3] = await Promise.all([
      api.get("now_playing"),
      api.get("popular"),
      api.get("top_rated"),
    ]);
    setNow(res1.data.results);
    setPopular(res2.data.results);
    setTopRated(res3.data.results);
  }

  useEffect(() => {
    loadMovie();
  }, []);

  return (
    <>
      <Header />
      <Outlet context={{ now, popular, topRated }} />
    </>
  );
}
