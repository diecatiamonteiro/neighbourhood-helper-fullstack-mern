import React from "react";
import { Link } from "react-router-dom";

export default function RegisterBtn() {
  return (
    <Link
      to={"/register"}
      className="text-base lg:text-lg bg-charcoal text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-charcoalHover transition-colors duration-200"
    >
      Register
    </Link>
  );
}
