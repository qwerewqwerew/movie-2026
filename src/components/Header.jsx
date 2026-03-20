import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  return (
    <header className="bg-black/50 fixed w-full top-0 left-0">
      <div className="container mx-auto bg-amber-800">
        <FontAwesomeIcon icon={faHouse} className="text-orange-400" />
      </div>
      <div>Header</div>
    </header>
  );
}
