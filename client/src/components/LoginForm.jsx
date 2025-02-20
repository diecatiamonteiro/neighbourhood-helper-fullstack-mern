import React, { useContext, useState } from "react";
import { DataContext } from "../contexts/Context";
import { loginUser } from "../api/usersApi";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const { usersState, usersDispatch } = useContext(DataContext);
  const { error, isLoading } = usersState;
  const [showMessages, setShowMessages] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMessages(true);
    usersDispatch({ type: "SET_LOADING_USERS", payload: true });

    const result = await loginUser(usersDispatch, formData);

    if (result) {
      navigate("/")
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 mt-6 md:mt-14 bg-white/50 rounded-lg shadow-md"
    >
      <h2 className="text-lg md:text-2xl font-semibold mb-2">
        Hi, Alt-West Neighbour!
      </h2>
      <p className="text-sm md:text-lg leading-tight md:leading-normal font-semibold mb-6">
        Login to ask for help or offer your help.
      </p>

      <div className="grid gap-4 text-left">
        {/* Email */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-2 items-center">
          <div className="md:col-span-1">
            <label htmlFor="email" className="block text-charcoal">
              Email
            </label>
          </div>
          <div className="md:col-span-3">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              required
              className="w-full p-2 border border-olive/30 rounded focus:outline-none focus:border-olive"
            />
          </div>
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-2 items-center">
          <div className="md:col-span-1">
            <label htmlFor="password" className="block text-charcoal">
              Password
            </label>
          </div>
          <div className="md:col-span-3">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="w-full p-2 border border-olive/30 rounded focus:outline-none focus:border-olive"
            />
          </div>
        </div>

        {/* Error Message */}
        {showMessages && error && (
          <div className="rounded mt-4 mb-0 p-2 md:p-3 text-sm md:text-base text-center bg-brick/30 text-brick">
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brick text-white mt-0 py-2 px-4 rounded hover:bg-brickHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
