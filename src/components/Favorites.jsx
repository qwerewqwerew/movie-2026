import { useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  } catch {
    return [];
  }
}

export function Favorites() {
  const [favs, setFavs] = useState(getFavorites);

  function removeFav(id) {
    const next = favs.filter((f) => f.id !== id);
    localStorage.setItem("favorites", JSON.stringify(next));
    setFavs(next);
  }

  return (
    <section className="bg-black min-h-screen px-11 pt-28 pb-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          내 <span className="text-yellow-400">즐겨찾기</span>
        </h2>

        {favs.length === 0 && (
          <p className="text-gray-400 text-xl">즐겨찾기한 영화가 없습니다.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {favs.map((item) => (
            <div key={item.id} className="py-10 relative group">
              <Link to={`/movie/${item.id}`}>
                <img
                  className="object-cover w-full h-full rounded-md"
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={item.title}
                />
                <h4 className="text-white text-xl font-bold truncate mt-2 px-1">{item.title}</h4>
              </Link>
              <button
                onClick={() => removeFav(item.id)}
                className="absolute top-12 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
