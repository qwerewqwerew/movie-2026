import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";

export function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  // 영화 정보 불러오기
  useEffect(() => {
    api
      .get("movie/" + id, {
        params: { append_to_response: "videos,credits,similar" },
      })
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMovie(null);
        setLoading(false);
      });
  }, [id]);

  // 불러오는 중
  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl animate-pulse">불러오는 중...</p>
      </div>
    );
  }

  // 에러
  if (!movie) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-2xl">영화 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }

  // 배경 이미지
  let backdrop = null;
  if (movie.backdrop_path) {
    backdrop = "https://image.tmdb.org/t/p/original/" + movie.backdrop_path;
  }

  // 포스터 이미지
  let poster = "https://via.placeholder.com/500x750?text=No+Image";
  if (movie.poster_path) {
    poster = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
  }

  // 예고편 찾기
  const videoList = movie.videos ? movie.videos.results : [];
  const trailer = videoList.find((v) => v.type === "Trailer" && v.site === "YouTube");

  // 출연진 8명
  const allCast = movie.credits ? movie.credits.cast : [];
  const cast = allCast.slice(0, 8);

  // 비슷한 영화 4개
  const allSimilar = movie.similar ? movie.similar.results : [];
  const similar = allSimilar.slice(0, 4);

  // 장르
  const genres = movie.genres || [];

  return (
    <div className="bg-black min-h-screen relative">
      {/* 배경 이미지 */}
      {backdrop && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(" + backdrop + ")" }}
        >
          <div className="absolute inset-0 bg-black/80" />
        </div>
      )}

      {/* 영화 정보 */}
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
              src={poster}
              alt={movie.title}
              className="w-full md:w-72 rounded-lg object-cover shadow-2xl"
            />

            <div className="flex flex-col gap-4 text-white">
              <h1 className="text-4xl font-bold text-yellow-400">{movie.title}</h1>
              <p className="text-gray-400 text-lg">{movie.original_title}</p>

              <div className="flex gap-4 text-sm text-gray-300">
                <span>개봉일: {movie.release_date || "미정"}</span>
                <span>러닝타임: {movie.runtime || 0}분</span>
              </div>

              <div className="flex gap-2 flex-wrap">
                {genres.map((genre) => (
                  <span key={genre.id} className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl font-bold">
                  ★ {movie.vote_average || 0}
                </span>
                <span className="text-gray-400">
                  ({movie.vote_count || 0}명 평가)
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed max-w-xl">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>

              {trailer && (
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
              {cast.map((actor) => {
                let photo = "https://via.placeholder.com/185x278?text=No+Photo";
                if (actor.profile_path) {
                  photo = "https://image.tmdb.org/t/p/w185/" + actor.profile_path;
                }
                return (
                  <div key={actor.id} className="text-center">
                    <img src={photo} alt={actor.name} className="w-full aspect-[2/3] object-cover rounded-lg" />
                    <p className="text-white text-sm font-bold mt-2 truncate">{actor.name}</p>
                    <p className="text-gray-400 text-xs truncate">{actor.character}</p>
                  </div>
                );
              })}
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
              {similar.map((m) => {
                let img = "https://via.placeholder.com/500x750?text=No+Image";
                if (m.poster_path) {
                  img = "https://image.tmdb.org/t/p/w500/" + m.poster_path;
                }
                return (
                  <Link key={m.id} to={"/movie/" + m.id} className="group">
                    <div className="overflow-hidden rounded-md">
                      <img src={img} alt={m.title} className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <p className="text-white font-bold mt-2 truncate">{m.title}</p>
                    <p className="text-yellow-400 text-sm">★ {m.vote_average || 0}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 예고편 팝업 */}
      {showTrailer && trailer && (
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
              src={"https://www.youtube.com/embed/" + trailer.key + "?autoplay=1"}
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
