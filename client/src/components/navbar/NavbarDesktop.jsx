import React, { useContext } from "react";
import { DataContext } from "../../contexts/Context";
import { Link } from "react-router-dom";

import LoginBtn from "./LoginBtn";
import Logo from "./Logo";
import RegisterBtn from "./RegisterBtn";
import LogoutBtn from "./LogoutBtn";
import MyAccountBtn from "./MyAccountBtn";

export default function Navbar() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isAuthenticated } = usersState;

  return (
    <nav className="sticky top-0 z-10 flex justify-between items-center p-5 bg-offwhite/80 hidden md:flex">
      <div className="flex items-center gap-12">
        <Logo />
      </div>

      <div className="flex flex-row gap-12 text-base lg:text-lg text-charcoal px-4 py-2 rounded-md hover:text-charcoalHover hover:font-extrabold transition-colors duration-200">
        <Link to={"/"} className="text-base font-semibold lg:text-lg">
          Offer Help
        </Link>
        <Link to={"/askforhelp"} className="text-base font-semibold lg:text-lg">
          Ask for Help
        </Link>
        <Link to={"/about"} className="text-base font-semibold lg:text-lg">
          About Us
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <LogoutBtn />
            <MyAccountBtn />
          </>
        ) : (
          <>
            <LoginBtn />
            <RegisterBtn />
          </>
        )}
      </div>
    </nav>
  );
}
