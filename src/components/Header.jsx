import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  return (
    <header className="bg-black/70 fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* 로고 */}
        <Link to="/">
          <span className="text-2xl font-bold text-yellow-400">GOFLEX</span>
        </Link>

        {/* 홈 아이콘 */}
        <Link to="/" className="text-white hover:text-yellow-400">
          <FontAwesomeIcon icon={faHouse} className="text-xl" />
        </Link>
      </div>
    </header>
  );
}
