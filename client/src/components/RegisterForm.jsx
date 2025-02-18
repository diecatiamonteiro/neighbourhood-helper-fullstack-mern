import React, { useContext, useState } from "react";
import { DataContext } from "../contexts/Context";
import { registerUser } from "../api/usersApi";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { usersState, usersDispatch } = useContext(DataContext);
  const { error, isLoading } = usersState;
  const [success, setSuccess] = useState(false);

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
    usersDispatch({ type: "SET_LOADING_USERS", payload: true });

    const result = await registerUser(usersDispatch, formData);

    if (result) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 mt-14 bg-white/50 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-charcoal mb-2">
        Hi, Alt-West Neighbour!
      </h2>
      <p className="text-olive mb-6">
        Create an account to ask for help or offer your help.
      </p>

      {(success || error) && (
        <div
          className={`mb-4 p-3 rounded ${
            success ? "bg-olive text-offwhite" : "bg-brick text-offwhite"
          }`}
        >
          {success
            ? "Registration successful! Redirecting to homepage..."
            : error}
        </div>
      )}

      <div className="flex flex-col gap-4 text-left">
        {/* Username */}
        <div className="flex flex-row gap-2 items-center">
          <div className="w-1/4">
            <label htmlFor="username" className="block text-charcoal mb-1">
              Username
            </label>
          </div>
          <div className="w-full">
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
        <div className="flex flex-row gap-2 items-center">
          <div className="w-1/4">
            <label htmlFor="firstName" className="block text-charcoal mb-1">
              First Name
            </label>
          </div>
          <div className="w-full">
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
        <div className="flex flex-row gap-2 items-center">
          <div className="w-1/4">
            <label htmlFor="lastName" className="block text-charcoal mb-1">
              Last Name
            </label>
          </div>
          <div className="w-full">
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
        <div className="flex flex-row gap-2 items-center">
          <div className="w-1/4">
            <label htmlFor="zipCode" className="block text-charcoal mb-1">
              Zip Code
            </label>
          </div>

          <select
            name="zipCode"
            id="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="w-full p-2 border border-olive/30 rounded focus:outline-none focus:border-olive bg-white"
          >
            <option value="04177 Lindenau, Alt-Lindenau, Neu-Lindenau">
              04177 Lindenau, Alt-Lindenau, Neu-Lindenau
            </option>
            <option value="04178 Böhlitz-Ehrenberg, Rückmarsdorf, Burghausen">
              04178 Böhlitz-Ehrenberg, Rückmarsdorf, Burghausen
            </option>
            <option value="04179 Leutzsch">04179 Leutzsch</option>
          </select>
        </div>

        {/* Email */}
        <div className="flex flex-row gap-2 items-center">
          <div className="w-1/4">
            <label htmlFor="email" className="block text-charcoal mb-1">
              Email
            </label>
          </div>
          <div className="w-full">
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
        <div className="flex flex-row gap-2 items-center">
          <div className="w-1/4">
            <label htmlFor="password" className="block text-charcoal mb-1">
              Password
            </label>
          </div>
          <div className="w-full">
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

        {/* Register Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brick text-white py-2 px-4 rounded hover:bg-brickHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {isLoading ? "Registering..." : success ? "Registered!" : "Register"}
        </button>
      </div>
    </form>
  );
}
