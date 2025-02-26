import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../api/usersApi";
import { DataContext } from "../../contexts/Context";

export default function LogoutBtn() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { isLoading } = usersState;

  const handleLogout = async () => {
    await logoutUser(usersDispatch);
  };

  return (
    <Link
      to={"/"}
      onClick={handleLogout}
      className="text-base lg:text-lg bg-charcoal text-white px-4 py-2 rounded-md hover:bg-charcoalHover transition-colors duration-200"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </Link>
  );
}
