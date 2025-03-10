import React, { useContext, useState } from "react";
import { DataContext } from "../contexts/Context";
import { registerUser } from "../api/usersApi";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../api/usersApi";
import GoogleIcon from "../components/GoogleIcon";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { usersState, usersDispatch } = useContext(DataContext);
  const { error, isLoading } = usersState;
  const [showMessages, setShowMessages] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    zipCode: "04177 Lindenau, Alt-Lindenau, Neu-Lindenau",
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

    const result = await registerUser(usersDispatch, formData);

    if (result) {
      navigate("/");
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
        navigate("/");
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
        Welcome, Alt-West Neighbour!
      </h2>
      <p className="text-sm md:text-lg leading-tight md:leading-normal font-semibold mb-6">
        Create an account to ask for help or offer your help.
      </p>

      <div className="grid gap-4 text-left">
        {/* Username */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-2 items-center">
          <div className="md:col-span-1">
            <label htmlFor="username" className="block text-charcoal">
              Username (publicly visible)
            </label>
          </div>
          <div className="md:col-span-3">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="lindenauerjohn"
              required
              className="w-full p-2 border border-olive/30 rounded focus:outline-none focus:border-olive"
            />
          </div>
        </div>

        {/* First Name */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-2 items-center">
          <div className="md:col-span-1">
            <label htmlFor="firstName" className="block text-charcoal">
              First Name
            </label>
          </div>
          <div className="md:col-span-3">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
              className="w-full p-2 border border-olive/30 rounded focus:outline-none focus:border-olive"
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-2 items-center">
          <div className="md:col-span-1">
            <label htmlFor="lastName" className="block text-charcoal">
              Last Name
            </label>
          </div>
          <div className="md:col-span-3">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
              className="w-full p-2 border border-olive/30 rounded focus:outline-none focus:border-olive"
            />
          </div>
        </div>

        {/* Zip Code */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-2 items-center">
          <div className="md:col-span-1">
            <label htmlFor="zipCode" className="block text-charcoal">
              Zip Code
            </label>
          </div>
          <div className="md:col-span-3">
            <select
              name="zipCode"
              id="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="w-full p-2 border border-olive/30 rounded focus:outline-none focus:border-olive bg-white"
            >
              {/* Zip Code - Mobile Options */}
              <option
                className="md:hidden"
                value="04177 Lindenau, Alt-Lindenau, Neu-Lindenau"
              >
                04177
              </option>
              <option
                className="md:hidden"
                value="04178 Böhlitz-Ehrenberg, Rückmarsdorf, Burghausen"
              >
                04178
              </option>
              <option className="md:hidden" value="04179 Leutzsch">
                04179
              </option>

              {/* Zip Code - Desktop Options */}
              <option
                className="hidden md:block"
                value="04177 Lindenau, Alt-Lindenau, Neu-Lindenau"
              >
                04177 Lindenau, Alt-Lindenau, Neu-Lindenau
              </option>
              <option
                className="hidden md:block"
                value="04178 Böhlitz-Ehrenberg, Rückmarsdorf, Burghausen"
              >
                04178 Böhlitz-Ehrenberg, Rückmarsdorf, Burghausen
              </option>
              <option className="hidden md:block" value="04179 Leutzsch">
                04179 Leutzsch
              </option>
            </select>
          </div>
        </div>

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

        {/* Register Buttons */}
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brick text-white mt-0 py-2 px-4 rounded hover:bg-brickHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-3 font-medium"
          >
            <GoogleIcon />
            Register with Google
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-brick hover:text-brickHover font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
