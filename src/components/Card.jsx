import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const FALLBACK_IMG = "https://via.placeholder.com/500x750?text=No+Image";

export function Card({ item }) {
  const poster = item.poster_path
    ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
    : FALLBACK_IMG;

  return (
    <div className="card py-10">
      <Link to={`/movie/${item.id}`}>
        <img className="object-cover w-full h-full rounded-md" src={poster} alt={item.title} />
        <div className="flex flex-col px-1 mt-2">
          <h4 className="text-white text-xl font-bold truncate">{item.title}</h4>
          <span className="flex items-center gap-2 font-bold text-yellow-500">
            <FontAwesomeIcon icon={faHeart} />
            <span>{item.vote_average.toFixed(1)}</span>
            <span className="font-medium text-gray-400">{item.release_date}</span>
          </span>
        </div>
      </Link>
    </div>
  );
}
