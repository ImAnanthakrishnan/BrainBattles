import { FaUserCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { logout as Logout } from "../../slices/userSlice";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement|null>(null);
  const { currentUser } = useAppSelector((data) => data.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navLinks = [
    {
      path: currentUser ? "/home" : "/",
      display: "Home",
    },
    {
      path: "/leaderboard",
      display: "Leaderboard",
    },
  ];
  const toggleMenu = () => menuRef.current?.classList.toggle("show__menu");
  const logout = () => {
    dispatch(Logout());
    navigate("/auth");
  };
  return (
    <header className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          <h3
            className="font-bold text-headingColor text-[1.5rem] cursor-pointer"
            onClick={() => {
              currentUser ? navigate("/home") : navigate("/");
            }}
          >
            Brain Battles
          </h3>
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-headingColor text-[16px] leading-7 font-[600] hover:underline"
                        : "text-headingColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex items-center gap-4">
            <FaUserCircle
              size={35}
              onClick={() => {currentUser ? setShowDropdown(true) : setShowDropdown(false)}}
              className="cursor-pointer"
            />
            {showDropdown && (
              <div 
               ref={dropdownRef}
               className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48">
                <button
                  onClick={() => {
                    currentUser ? logout() : navigate("/auth"),
                    setShowDropdown(false);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout 
                </button>
              </div>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-7 h-7 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
