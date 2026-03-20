import { useOutletContext, Link } from "react-router";
import { Section } from "./Section.jsx";
import { SkeletonSection } from "./Skeleton.jsx";

export function Home() {
  const { now, popular, topRated, loading } = useOutletContext();

  const hero = popular.length > 0 ? popular[Math.floor(Math.random() * Math.min(5, popular.length))] : null;

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

export function VideoHero({ movie }) {
  return (
    <section className="relative h-screen overflow-hidden">
      <video src="video.mp4" className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop playsInline />
      <div className="absolute bg-black/50 w-full h-full top-0 left-0"></div>
      <div className="relative container mx-auto flex flex-col justify-center items-center h-full text-center px-6">
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-yellow-400">GOFLEX</h2>
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
    </section>
  );
}
