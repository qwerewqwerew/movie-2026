import { Link } from "react-router";
import { Card } from "./Card.jsx";
import { Container } from "./UI.jsx";

export function Section({ title, items, category }) {
  return (
    <Container className="py-24">
      <div className="flex items-center justify-between pt-10 pb-5 px-3">
        <h2 className="text-4xl font-bold text-white">{title}</h2>
        {category && (
          <Link to={`/category/${category}`} className="text-yellow-400 hover:text-yellow-300 text-sm font-bold">
            더보기 &rarr;
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((el) => (
          <Card key={el.id} item={el} />
        ))}
      </div>
    </Container>
  );
}
