import React, { useContext } from "react";
import { DataContext } from "../../contexts/Context";

import LoginBtn from "./LoginBtn";
import Logo from "./Logo";
import RegisterBtn from "./RegisterBtn";
import LogoutBtn from "./LogoutBtn";
import MyAccountBtn from "./MyAccountBtn";

export default function Navbar() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isAuthenticated } = usersState;

  return (
    <nav className="sticky top-0 z-10 flex justify-between items-center p-5 bg-white/50">
      <div className="flex items-center gap-12">
        <Logo />
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
