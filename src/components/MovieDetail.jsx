import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";

const FALLBACK_POSTER = "https://via.placeholder.com/500x750?text=No+Image";
const FALLBACK_PHOTO = "https://via.placeholder.com/185x278?text=No+Photo";

export function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // state — movie 안에 videos, credits, similar 전부 들어옴
  // showTrailer도 같이 관리하여 id 변경 시 자동 초기화
  const [state, setState] = useState({ id: null, movie: null, loading: true, showTrailer: false });

  // append_to_response를 쓰면 API 1번으로 영화+영상+출연진+비슷한영화를 한꺼번에 받아옴
  useEffect(() => {
    let cancelled = false;
    api
      .get(`movie/${id}`, {
        params: { append_to_response: "videos,credits,similar" },
      })
      .then((res) => {
        if (!cancelled) setState({ id, movie: res.data, loading: false, showTrailer: false });
      })
      .catch(() => {
        if (!cancelled) setState({ id, movie: null, loading: false, showTrailer: false });
      });

    return () => { cancelled = true; };
  }, [id]);

  // id가 바뀌었는데 아직 데이터 안 옴 → 로딩 상태
  const loading = state.id !== id || state.loading;
  const movie = state.id === id ? state.movie : null;
  const showTrailer = state.id === id && state.showTrailer;
  const setShowTrailer = (val) => setState((s) => ({ ...s, showTrailer: val }));

  // --- 로딩 / 에러 화면 ---
  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl animate-pulse">불러오는 중...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-2xl">영화 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }

  // --- movie 하나에서 필요한 데이터 꺼내기 ---
  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : null;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : FALLBACK_POSTER;

  // 유튜브 예고편 찾기
  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  // 출연진 8명만
  const cast = movie.credits?.cast?.slice(0, 8) || [];

  // 비슷한 영화 4개만
  const similar = movie.similar?.results?.slice(0, 4) || [];

  // 장르 (없으면 빈 배열)
  const genres = movie.genres || [];

  return (
    <div className="bg-black min-h-screen relative">
      {/* 배경 이미지 */}
      {backdrop && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdrop})` }}
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
                  ★ {(movie.vote_average || 0).toFixed(1)}
                </span>
                <span className="text-gray-400">
                  ({(movie.vote_count || 0).toLocaleString()}명 평가)
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed max-w-xl">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>

              {/* 예고편 버튼 */}
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
              {cast.map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}` : FALLBACK_PHOTO}
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
                      src={m.poster_path ? `https://image.tmdb.org/t/p/w500/${m.poster_path}` : FALLBACK_POSTER}
                      alt={m.title}
                      className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-white font-bold mt-2 truncate">{m.title}</p>
                  <p className="text-yellow-400 text-sm">★ {(m.vote_average || 0).toFixed(1)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 트레일러 모달 */}
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
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
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
