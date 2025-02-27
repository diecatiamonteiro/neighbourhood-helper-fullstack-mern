import React, { useContext, useState } from "react";
import { DataContext } from "../contexts/Context";
import { loginUser, loginWithGoogle } from "../api/usersApi";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "../components/GoogleIcon";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
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
      navigate(location.state?.returnTo || '/');
    }
  };

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setShowMessages(true);
      const result = await loginWithGoogle(
        usersDispatch,
        tokenResponse.access_token
      );
      if (result) {
        console.log('Navigating to (Google):', location.state?.returnTo || '/');
        navigate(location.state?.returnTo || '/');
      }
    },
    onError: (error) => {
      setShowMessages(true);
      usersDispatch({
        type: "SET_ERROR_USERS",
        payload: "Failed to connect with Google. Please try again.",
      });
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 mt-24 lg:mt-14 bg-white/50 rounded-lg shadow-md"
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

        {/* Login Buttons */}
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brick text-white py-2 px-4 rounded hover:bg-brickHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-3 font-medium"
          >
            <GoogleIcon />
            Login with Google
          </button>
        </div>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-brick hover:text-brickHover font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
