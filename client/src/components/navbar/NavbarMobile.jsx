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
    <nav className="sticky top-0 z-10 bg-white/50 md:hidden p-4">
      <div className="flex flex-wrap justify-evenly items-center gap-1 w-full">
        <div className="w-full flex justify-center">
          <Logo />
        </div>

        <div className="text-base lg:text-lg text-charcoal leading-none px-4 py-2 rounded-md">
          <Link to={"/"} className="text-base font-semibold lg:text-lg">
            Connect With Neighbours Now!
          </Link>
        </div>

        <div className="flex gap-4 justify-center">
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
      </div>
    </nav>
  );
}
