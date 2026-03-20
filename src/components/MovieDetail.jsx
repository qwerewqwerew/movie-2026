import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHeart as faHeartSolid, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router";
import api from "../api/axios";

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  } catch {
    return [];
  }
}

function toggleFavorite(movie) {
  const favs = getFavorites();
  const exists = favs.some((f) => f.id === movie.id);
  const next = exists ? favs.filter((f) => f.id !== movie.id) : [...favs, { id: movie.id, title: movie.title, poster_path: movie.poster_path }];
  localStorage.setItem("favorites", JSON.stringify(next));
  return !exists;
}

export function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);

  async function loadMovieDetail() {
    try {
      const [res, videosRes, creditsRes, similarRes] = await Promise.all([
        api.get(id),
        api.get(`${id}/videos`),
        api.get(`${id}/credits`),
        api.get(`${id}/similar`),
      ]);
      setMovie(res.data);
      setIsFav(getFavorites().some((f) => f.id === res.data.id));
      const trailer = videosRes.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      if (trailer) setTrailerKey(trailer.key);
      setCast(creditsRes.data.cast.slice(0, 8));
      setSimilar(similarRes.data.results.slice(0, 4));
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
        <div className="container mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-yellow-400 mb-6 inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>뒤로가기</span>
          </button>

          <div className="flex flex-col md:flex-row gap-10">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-72 rounded-lg object-cover shadow-2xl"
          />

          <div className="flex flex-col gap-4 text-white">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-yellow-400">{movie.title}</h1>
              <button
                onClick={() => setIsFav(toggleFavorite(movie))}
                className="text-2xl hover:scale-110 transition-transform"
              >
                <FontAwesomeIcon
                  icon={isFav ? faHeartSolid : faHeartRegular}
                  className={isFav ? "text-red-500" : "text-gray-400"}
                />
              </button>
            </div>
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

            {trailerKey && (
              <button
                onClick={() => setShowTrailer(true)}
                className="mt-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 w-fit transition-colors"
              >
                <FontAwesomeIcon icon={faPlay} />
                예고편 보기
              </button>
            )}
          </div>
          </div>
        </div>
      </div>

      {/* 출연진 */}
      {cast.length > 0 && (
        <div className="relative bg-black/60 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-6">출연진</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {cast.map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                        : "https://via.placeholder.com/185x278?text=No+Photo"
                    }
                    alt={actor.name}
                    className="w-full aspect-[2/3] object-cover rounded-lg"
                  />
                  <p className="text-white text-sm font-bold mt-2 truncate">{actor.name}</p>
                  <p className="text-gray-400 text-xs truncate">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 비슷한 영화 */}
      {similar.length > 0 && (
        <div className="relative bg-black py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-6">비슷한 영화</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {similar.map((m) => (
                <Link key={m.id} to={`/movie/${m.id}`} className="group">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={
                        m.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${m.poster_path}`
                          : "https://via.placeholder.com/500x750?text=No+Image"
                      }
                      alt={m.title}
                      className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-white font-bold mt-2 truncate">{m.title}</p>
                  <p className="text-yellow-400 text-sm">★ {m.vote_average?.toFixed(1)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 트레일러 모달 */}
      {showTrailer && trailerKey && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-yellow-400"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
