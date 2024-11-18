import { useId } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Navbar({ onSearchChange }) {
  const inputId = useId();
  const { isLoggedIn, login, logout } = useUser();

  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <nav className="grid grid-cols-3 justify-between px-24 py-4 bg-[#1B1F24] items-center sticky top-0">
      {/* Bagian Kiri: Judul dan Link Home */}
      <ul className="flex items-center gap-4">
        {/* Tambahkan Judul */}
        <li className="text-[#F2F4FF] text-lg font-bold">Kukuh.</li>
        <li>
          <Link to="/" className="text-[#F2F4FF] hover:text-[#A0A7B8] active:text-[#6C7281]">
            Home
          </Link>
        </li>
      </ul>

      {/* Bagian Tengah: Search Input */}
      <ul className="flex justify-center items-center">
        <li className="w-full">
          <input
            type="text"
            className="text-black active:text-black focus:text-black px-4 py-2 w-full"
            name="search"
            id={inputId}
            placeholder="Search product..."
            onChange={handleSearchInput}
          />
        </li>
      </ul>

      {/* Bagian Kanan: Login/Logout dan Menu */}
      <ul className="flex justify-end gap-4 items-center">
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/cart" className="text-[#F2F4FF] hover:text-[#A0A7B8] active:text-[#6C7281]">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/orders" className="text-[#F2F4FF] hover:text-[#A0A7B8] active:text-[#6C7281]">
                My Orders
              </Link>
            </li>
            <li>
              <button onClick={logout} className="text-[#F2F4FF] hover:text-[#A0A7B8] active:text-[#6C7281]">
                Sign out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={login} className="text-[#F2F4FF] hover:text-[#A0A7B8] active:text-[#6C7281]">
                Sign in
              </button>
            </li>
            <li>
              <Link to="/signup" className="text-[#F2F4FF] hover:text-[#A0A7B8] active:text-[#6C7281]">
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
