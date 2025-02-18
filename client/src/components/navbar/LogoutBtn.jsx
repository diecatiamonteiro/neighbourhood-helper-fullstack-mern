import React from "react";
import { Link } from "react-router-dom";

export default function LogoutBtn() {
  return (
    <Link
      to={"/"}
      className="text-lg bg-charcoal text-white px-4 py-2 rounded-md hover:bg-charcoalHover transition-colors duration-200"
    >
      Logout
    </Link>
  );
}
