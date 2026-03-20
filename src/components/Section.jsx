import { Card } from "./Card.jsx";
export function Section({ title, items }) {
  return (
    <section className="bg-black px-11 py-24">
      <div className="container mx-auto">
        <h2 className="text-4xl text-bold pt-10 pb-5 px-3 text-white">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((el) => (
            <Card key={el.id} item={el} />
          ))}
        </div>
      </div>
    </section>
  );
}
