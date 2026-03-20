import { useParams } from "react-router";
export function MovieDetail() {
  console.log("무비디테일", useParams());
  const text = useParams();
  return (
    <>
      <div className="text-9xl">{text.id}</div>
    </>
  );
}
