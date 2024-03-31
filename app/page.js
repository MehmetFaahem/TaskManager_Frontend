"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [loggedin, setloggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setloggedin(true);
    }
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col justify-center items-center py-6">
      <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Task manager</h1>
        {loggedin ? (
          <div>
            <button className="inline-block px-4 py-2 mr-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Github
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                location.reload();
              }}
              className="inline-block px-4 py-2 mr-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              log out
            </button>
          </div>
        ) : (
          <div>
            <button
              className="inline-block px-4 py-2 mr-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="inline-block px-4 py-2 text-sm font-medium text-blue-500 bg-white rounded-md border border-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none focus:text-white focus:bg-blue-600"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        )}
      </header>
      <main className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-3xl font-bold text-white mb-6">
          Welcome to Task Manager
        </h2>
        <p className="text-xl w-[50%] text-center text-white mb-12">
          This task manager is created as coding test for MERN Stack Developer
          Internship. Here backend created with Express.JS and Frontend created
          with Next.JS 14. Database: MongoDB
        </p>

        {loggedin ? (
          <div className="flex space-x-4">
            <div
              onClick={() => router.push("/create")}
              className="w-48 hover:bg-blue-300 transition-all cursor-pointer h-48 bg-white rounded-lg shadow-md flex justify-center items-center"
            >
              <p className="text-lg font-semibold text-gray-800">
                Create Tasks
              </p>
            </div>
            <div
              onClick={() => router.push("/tasks")}
              className="w-48 hover:bg-blue-300 transition-all cursor-pointer h-48 bg-white rounded-lg shadow-md flex justify-center items-center"
            >
              <p className="text-lg font-semibold text-gray-800">Read Tasks</p>
            </div>
            <div
              onClick={() => router.push("/tasks")}
              className="w-48 hover:bg-blue-300 transition-all cursor-pointer h-48 bg-white rounded-lg shadow-md flex justify-center items-center"
            >
              <p className="text-lg font-semibold text-gray-800">
                Update Tasks
              </p>
            </div>
            <div
              onClick={() => router.push("/tasks")}
              className="w-48 hover:bg-blue-300 transition-all cursor-pointer h-48 bg-white rounded-lg shadow-md flex justify-center items-center"
            >
              <p className="text-lg font-semibold text-gray-800">
                Delete Tasks
              </p>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="inline-block px-4 py-2 mr-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="inline-block px-4 py-2 text-sm font-medium text-blue-500 bg-white rounded-md border border-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none focus:text-white focus:bg-blue-600"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        )}
      </main>
      <footer className="w-full text-center text-gray-300 py-4 bg-gray-800">
        <p>&copy; 2024 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
