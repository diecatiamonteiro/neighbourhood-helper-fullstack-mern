import React, { useContext, useState, useEffect, useRef } from "react";
import { DataContext } from "../../contexts/Context";
import { Link } from "react-router-dom";
import LoginBtn from "./LoginBtn";
import Logo from "./Logo";
import RegisterBtn from "./RegisterBtn";
import LogoutBtn from "./LogoutBtn";
import MyAccountBtn from "./MyAccountBtn";
import HamburgerBtnMobile from "./HamburgerBtnMobile";
import DropdownMobile from "./DropDownMobile";

export default function Navbar() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isAuthenticated } = usersState;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav 
      ref={navRef} 
      className="fixed top-0 left-0 right-0 z-50 bg-offwhite/90 lg:hidden p-4"
    >
      <div className="">
        <div className="w-full flex justify-between items-center">
          <Logo />
          <HamburgerBtnMobile
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>

        <DropdownMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </nav>
  );
}
