import { useOutletContext } from "react-router";
import { Section } from "./Section.jsx";
import { SkeletonSection } from "./Skeleton.jsx";

export function Home() {
  const { now, popular, topRated, loading } = useOutletContext();

  return (
    <>
      <VideoHero />
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

// VideoHero  //

export function VideoHero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <video src="video.mp4" className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop playsInline />
      <div className="absolute bg-black/50 w-full h-full top-0 left-0"></div>
      <div className="relative container mx-auto flex flex-col justify-center items-center h-full">
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-yellow-400">GOFLEX</h2>
        <p className="text-xl md:text-2xl text-white">최신 영화와 인기 작품을 만나보세요.</p>
      </div>
    </section>
  );
}
