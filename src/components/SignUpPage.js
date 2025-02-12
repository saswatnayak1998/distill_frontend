"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RunButton } from "@/components/ui"; // Using the existing RunButton component
import FormInput from "@/components/ui/FormInput"; // Importing the FormInput component

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    resume: "",
  });
  const [isLoading, setIsLoading] = useState(false); // State for loading during API call
  const [error, setError] = useState(""); // State for error messages

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Call the /create-user endpoint
      const response = await fetch("https://backenddistill-production.up.railway.app:8080/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response from server");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Signup failed");
      }

      console.log("User created:", data);

      // Redirect to the login page after successful signup
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message || "Failed to create user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <div className="w-1/3 p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
          Create Your Account
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-2 bg-red-500/20 text-red-300 text-sm rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Name Input */}
          <FormInput
            label="Username"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your username"
            required
          />

          {/* Password Input */}
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />

          {/* Resume Input */}
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-300">
              Resume (Optional)
            </label>
            <textarea
              id="resume"
              name="resume"
              value={formData.resume}
              onChange={handleInputChange}
              placeholder="Paste your resume here"
              className="mt-1 block w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <RunButton
              isLoading={isLoading}
              type="submit"
              label="Sign Up"
              gradientFrom="from-teal-500"
              gradientTo="to-purple-600"
              icon="🚀"
              className="w-32 py-2"
            />
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-teal-400 hover:text-teal-300 font-semibold"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;