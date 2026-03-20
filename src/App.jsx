import { useState, useEffect } from "react";
import api from "./api/axios";
import { Outlet } from "react-router";
import { Header } from "./components/Header";

export default function App() {
  const [now, setNow] = useState([]);

  async function loadMovie() {
    const res1 = await api.get(`now_playing`);
    const data = res1.data.results;
    setNow(data);
  }
  useEffect(() => {
    loadMovie();
  }, []);

  return (
    <>
      <Header />
      <Outlet context={{ now }} />
    </>
  );
}
