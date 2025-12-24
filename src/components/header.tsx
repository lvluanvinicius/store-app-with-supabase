import { Link } from "@tanstack/react-router";

export const Header = () => {
  return (
    <header className="bg-neutral-800">
      <nav className="container mx-auto flex items-center justify-between py-2 xl:max-w-7xl">
        <div>
          <h1>LOGO</h1>
        </div>

        <Menu />
      </nav>
    </header>
  );
};

const Menu = () => {
  return (
    <ul className="flex items-center gap-4">
      <li>
        <button className="cursor-pointer rounded-md bg-neutral-700 px-4 py-1 text-sm transition duration-300 ease-in-out hover:bg-neutral-600">
          Criar Conta
        </button>
      </li>
      <li>
        <Link to="/login">
          <button className="cursor-pointer rounded-md bg-violet-600 px-4 py-1 text-sm transition duration-300 ease-in-out hover:bg-violet-700">
            Login
          </button>
        </Link>
      </li>
    </ul>
  );
};
