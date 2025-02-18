import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Logo() {
  return (
    <Link to={"/"} className="flex items-center gap-4">
      <img
        src={logo}
        alt="logo"
        className="w-full h-full object-contain max-w-[50px] max-h-[50px]"
      />
      <span className="text-2xl uppercase font-bold">Alt-West Connect</span>
    </Link>
  );
}
