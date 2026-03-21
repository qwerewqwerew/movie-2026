import { useEffect, useRef, useState } from "react";
import { useOutletContext, Link } from "react-router";
import { Section } from "./Section.jsx";

export function Home() {
  const { now, popular, topRated, loading } = useOutletContext();

  // 인기영화 중 랜덤 1개를 히어로에 표시 (최초 1회만 선택)
  const [hero, setHero] = useState(null);
  useEffect(() => {
    if (popular.length > 0 && !hero) {
      setHero(popular[Math.floor(Math.random() * Math.min(5, popular.length))]);
    }
  }, [popular]);

  return (
    <>
      <VideoHero movie={hero} />
      {loading ? (
        <>
          <SkeletonSection />
          <SkeletonSection />
          <SkeletonSection />
        </>
      ) : (
        <>
          <Section title="현재 상영작" items={now} category="now_playing" />
          <Section title="인기 영화" items={popular} category="popular" />
          <Section title="최고 평점" items={topRated} category="top_rated" />
        </>
      )}
    </>
  );
}

// ──────────────────────────────────────
// VideoHero — 히어로 비디오 섹션
// ──────────────────────────────────────
function VideoHero({ movie }) {
  const titleRef = useRef(null);
  const textRef = useRef(null);

  // GSAP으로 텍스트 등장 애니메이션
  useEffect(() => {
    if (typeof gsap === "undefined") return;

    const a1 = gsap.from(titleRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      delay: 0.3,
    });

    const a2 = gsap.from(textRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.6,
    });

    return () => {
      a1.kill();
      a2.kill();
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <video
        src="video.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay muted loop playsInline
      />
      <div className="absolute bg-black/50 w-full h-full top-0 left-0"></div>
      <div className="relative container mx-auto flex flex-col justify-center items-center h-full text-center px-6">
        <h2 ref={titleRef} className="text-5xl md:text-7xl lg:text-9xl font-bold text-yellow-400">
          GOFLEX
        </h2>
        <div ref={textRef}>
          <p className="text-xl md:text-2xl text-white mt-4">최신 영화와 인기 작품을 만나보세요.</p>
          {movie && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <p className="text-gray-300 text-lg">지금 인기 있는 영화</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white">{movie.title}</h3>
              <Link
                to={`/movie/${movie.id}`}
                className="mt-2 bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
              >
                자세히 보기
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────
// SkeletonSection — 로딩 중 뼈대 UI
// ──────────────────────────────────────
function SkeletonSection() {
  return (
    <section className="bg-black px-11 py-24">
      <div className="container mx-auto">
        <div className="h-10 w-48 bg-gray-800 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="py-10">
              <div className="w-full aspect-[2/3] bg-gray-800 rounded-md animate-pulse" />
              <div className="mt-2 px-1 space-y-2">
                <div className="h-6 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
