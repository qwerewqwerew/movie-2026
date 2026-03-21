import axios from "axios";

// TMDB API 공통 설정
// baseURL을 /3/ 까지만 설정하면 movie, search 등 모든 엔드포인트를 하나로 사용 가능
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "ko-KR",
    region: "KR",
  },
});

export default api;
