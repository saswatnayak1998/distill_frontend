"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RunButton } from "@/components/ui"; // Using the existing RunButton component
import FormInput from "@/components/ui/FormInput"; // Importing the new FormInput component

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // State for loading during API call
  const [error, setError] = useState(""); // State for error messages

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true);
    setError("");
    try {
      // API call
      const response = await fetch("https://backenddistill-production.up.railway.app/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.username, // Ensure this matches the backend's expected field
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error Data:", errorData); // Debugging step
        throw new Error(errorData.detail || "Login failed");
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("Parsed API Response:", data); // Debugging step

      if (data.message) {
        alert(data.message); // Display message

        // Store candidate_id in sessionStorage
        if (data.candidate_id) {
          sessionStorage.setItem("candidateId", data.candidate_id);
          console.log("Stored candidateId in sessionStorage:", data.candidate_id); // Debugging step
        }

        // Store login status in sessionStorage
        sessionStorage.setItem("loggedIn", true);
        console.log("Session Storage:", sessionStorage.getItem("loggedIn")); // Debugging step

        // Redirect to /testtile with candidate_id in the URL
        console.log("Redirecting to /testtile..."); // Debugging step
        router.push(`/testtile?candidateId=${data.candidate_id}`);
      } else {
        setError("Unexpected response format.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign-up navigation
  const handleSignUp = () => {
    router.push("/signup"); // Navigate to the SignUp page
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white px-4">
      <div className="w-full max-w-md px-6 py-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
          Candidate Login
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-300 text-sm rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <FormInput
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
        </form>

        <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
          <RunButton
            isLoading={isLoading}
            onClick={handleLogin}
            label="Login"
            gradientFrom="from-teal-500"
            gradientTo="to-purple-600"
            icon="🚀"
            className="w-full sm:w-32 py-2"
          />
          <RunButton
            isLoading={false}
            onClick={handleSignUp}
            label="Sign Up"
            gradientFrom="from-purple-500"
            gradientTo="to-pink-600"
            icon="✨"
            className="w-full sm:w-32 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
