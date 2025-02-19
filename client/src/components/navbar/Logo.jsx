import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";

export default function Logo() {
  return (
    <Link to={"/"} className="flex items-center gap-2 md:gap-4">
      <img
        src={logo}
        alt="logo"
        className="
        w-full h-full object-contain 
        max-w-[40px] max-h-[40px] 
        lg:max-w-[50px] lg:max-h-[50px]"
      />
      <span className="text-base md:text-xl lg:text-2xl uppercase font-bold">
        Alt-West Connect
      </span>
    </Link>
  );
}
