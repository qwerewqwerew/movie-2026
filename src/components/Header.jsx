import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate("/search?q=" + encodeURIComponent(trimmed));
    setQuery("");
    setMenuOpen(false);
  }

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/95 shadow-lg" : "bg-black/30"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <span className="text-2xl font-bold text-yellow-400">GOFLEX</span>
        </Link>

        <button
          className="md:hidden text-white text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>

        <div className="hidden md:flex items-center gap-4">
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

          <Link to="/" className="text-white hover:text-yellow-400">
            <FontAwesomeIcon icon={faHouse} className="text-xl" />
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/95 px-6 pb-4 flex flex-col gap-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="영화 검색..."
              className="bg-gray-800 text-white px-3 py-1.5 rounded-l-md text-sm outline-none placeholder-gray-400 flex-1"
            />
            <button type="submit" className="bg-yellow-400 text-black px-3 py-1.5 rounded-r-md hover:bg-yellow-300">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          <Link to="/" onClick={() => setMenuOpen(false)} className="text-white hover:text-yellow-400 flex items-center gap-2">
            <FontAwesomeIcon icon={faHouse} /> 홈
          </Link>
        </div>
      )}
    </header>
  );
}
