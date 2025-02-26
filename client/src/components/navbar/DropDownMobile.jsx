import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../contexts/Context";
import LoginBtn from "./LoginBtn";
import RegisterBtn from "./RegisterBtn";
import LogoutBtn from "./LogoutBtn";
import MyAccountBtn from "./MyAccountBtn";

export default function DropdownMobile({ isMenuOpen, setIsMenuOpen }) {
  const { usersState } = useContext(DataContext);
  const { isAuthenticated } = usersState;

  const menuItems = [
    {
      href: "/",
      label: "Offer Help",
    },
    {
      href: "/askforhelp",
      label: "Ask for Help",
    },
    {
      href: "/about",
      label: "About Us",
    },
  ];

  return (
    <div
      className={`
      absolute 
      top-full left-0 w-full 
      bg-offwhite/90
      transform transition-all duration-300 ease-in-out
      ${
        isMenuOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-4 opacity-0 pointer-events-none"
      }
    `}
    >
      {/* Menu items */}
      <div className="px-6 border-b border-primary/40">
        {menuItems.map((item, index) => (
          <Link
            key={item.href}
            to={item.href}
            className={`
                relative block w-full transition-all duration-200 font-semibold text-lg
                ${index === menuItems.length - 1 ? "pb-2" : "pb-4"} 
                ${index === 0 ? "pt-6" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        
        {/* Authentication buttons */}
        <div className="flex gap-4 justify-center py-6">
          {isAuthenticated ? (
            <>
              <div onClick={() => setIsMenuOpen(false)}>
                <LogoutBtn />
              </div>
              <div onClick={() => setIsMenuOpen(false)}>
                <MyAccountBtn />
              </div>
            </>
          ) : (
            <>
              <div onClick={() => setIsMenuOpen(false)}>
                <LoginBtn />
              </div>
              <div onClick={() => setIsMenuOpen(false)}>
                <RegisterBtn />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
