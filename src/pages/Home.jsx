import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/amzify-logo.png";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <img className="auth-logo" src={Logo} />
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Log In
              </Link>
              <button
                onClick={handleGetStarted}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="space-y-8">
              <h2 className="text-5xl font-bold leading-tight">
                We make selling online{" "}
                <span className="text-primary-600">simple and seamless.</span>
              </h2>
              <p className="text-xl text-gray-600">
                Manage your Amazon, Shopify, TikTok Shop, and other channels
                from one powerful dashboard.
              </p>
              <div>
                <button
                  onClick={handleGetStarted}
                  className="px-8 py-4 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Get Started Free
                </button>
              </div>
            </div>

            {/* Right Column - Static Illustration */}
            <div className="relative">
              <img
                src="https://illustrations.popsy.co/white/work-from-home.svg"
                alt="Illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
