import { useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "../api/axios";

export function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadMovieDetail() {
    try {
      const res = await api.get(id);
      setMovie(res.data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl">불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-2xl">영화 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : null;

  return (
    <div className="bg-black min-h-screen relative">
      {backdrop && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdrop})` }}
        >
          <div className="absolute inset-0 bg-black/80" />
        </div>
      )}

      <div className="relative pt-24 pb-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-10">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-72 rounded-lg object-cover shadow-2xl"
          />

          <div className="flex flex-col gap-4 text-white">
            <h1 className="text-4xl font-bold text-yellow-400">{movie.title}</h1>
            <p className="text-gray-400 text-lg">{movie.original_title}</p>

            <div className="flex gap-4 text-sm text-gray-300">
              <span>개봉일: {movie.release_date}</span>
              <span>러닝타임: {movie.runtime}분</span>
            </div>

            <div className="flex gap-2 flex-wrap">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-xl font-bold">★ {movie.vote_average.toFixed(1)}</span>
              <span className="text-gray-400">({movie.vote_count.toLocaleString()}명 평가)</span>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-xl">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
