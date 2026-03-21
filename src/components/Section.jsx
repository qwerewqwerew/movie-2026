import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { Card } from "./Card.jsx";

export function Section({ title, items, category }) {
  const gridRef = useRef(null);

  // GSAP ScrollTrigger로 카드가 스크롤 시 나타나는 효과
  useEffect(() => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(gridRef.current.children, {
      opacity: 0,
      y: 40,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 85%",
      },
    });
  }, [items]);

  return (
    <section className="bg-black px-11 py-24">
      <div className="container mx-auto">
        <div className="flex items-center justify-between pt-10 pb-5 px-3">
          <h2 className="text-4xl font-bold text-white">{title}</h2>
          {category && (
            <Link
              to={`/category/${category}`}
              className="text-yellow-400 hover:text-yellow-300 text-sm font-bold"
            >
              더보기 &rarr;
            </Link>
          )}
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((el) => (
            <Card key={el.id} item={el} />
          ))}
        </div>
      </div>
    </section>
  );
}
