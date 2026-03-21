import { useOutletContext, Link } from "react-router";
import { Section } from "./Section.jsx";
import { Spinner } from "./UI.jsx";

export function Home() {
  const { now, popular, topRated, loading } = useOutletContext();

  // 인기영화 첫 번째를 히어로에 표시
  var hero = null;
  if (popular.length > 0) {
    hero = popular[0];
  }

  return (
    <>
      {/* 상단 비디오 영역 */}
      <section className="relative h-screen overflow-hidden">
        <video src="video.mp4" className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop playsInline />
        <div className="absolute bg-black/50 w-full h-full top-0 left-0"></div>
        <div className="relative container mx-auto flex flex-col justify-center items-center h-full text-center px-6">
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-yellow-400">GOFLEX</h2>
          <p className="text-xl md:text-2xl text-white mt-4">최신 영화와 인기 작품을 만나보세요.</p>
          {hero && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <p className="text-gray-300 text-lg">지금 인기 있는 영화</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white">{hero.title}</h3>
              <Link to={`/movie/${hero.id}`} className="mt-2 bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
                자세히 보기
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 영화 목록 */}
      {loading && <Spinner className="text-center py-20 bg-black" />}

      {!loading && (
        <>
          <Section title="현재 상영작" items={now} category="now_playing" />
          <Section title="인기 영화" items={popular} category="popular" />
          <Section title="최고 평점" items={topRated} category="top_rated" />
        </>
      )}
    </>
  );
}
