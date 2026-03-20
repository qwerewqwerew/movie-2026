import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setQuery("");
  }

  return (
    <header className="bg-black/70 fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/">
          <span className="text-2xl font-bold text-yellow-400">GOFLEX</span>
        </Link>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="영화 검색..."
              className="bg-gray-800 text-white px-3 py-1.5 rounded-l-md text-sm outline-none placeholder-gray-400 w-40 md:w-56"
            />
            <button type="submit" className="bg-yellow-400 text-black px-3 py-1.5 rounded-r-md hover:bg-yellow-300">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          <Link to="/favorites" className="text-white hover:text-red-400">
            <FontAwesomeIcon icon={faHeart} className="text-xl" />
          </Link>

          <Link to="/" className="text-white hover:text-yellow-400">
            <FontAwesomeIcon icon={faHouse} className="text-xl" />
          </Link>
        </div>
      </div>
    </header>
  );
}
