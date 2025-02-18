import React from "react";
import { Link } from "react-router-dom";

export default function LoginBtn() {
  return (
    <Link
      to={"/login"}
      className="text-base lg:text-lg bg-olive text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-oliveHover transition-colors duration-200"
    >
      Login
    </Link>
  );
}
