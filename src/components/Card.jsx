import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
export function Card({ item }) {
  console.log({ item });
  return (
    <div className="card py-10">
      <Link to={`movie/${item.id}`}>
        <img className="object-cover w-full h-full rounded-md" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} />
        <div className="flex flex-col px-1">
          <h4 className="text-white text-xl text-bold truncate">{item.original_title}</h4>
          <span className="flex items-center gap-2 font-bold text-yellow-500">
            <FontAwesomeIcon icon={faHeart} />
            <span>{item.vote_average}</span>
            <span className="font-medium">{item.release_date}</span>
          </span>
        </div>
      </Link>
    </div>
  );
}
