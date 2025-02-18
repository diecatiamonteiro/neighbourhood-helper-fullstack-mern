import React from "react";
import { Link } from "react-router-dom";

export default function LoginBtn() {
  return (
    <Link
      to={"/login"}
      className="text-lg bg-olive text-white px-4 py-2 rounded-md hover:bg-oliveHover transition-colors duration-200"
    >
      Login
    </Link>
  );
}
