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
    <div className="min-h-screen bg-[#131938] flex flex-col">
      <header className="w-full flex justify-between items-center px-6 py-4 bg-[#252d6d]/90 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white">Task Manager</h1>
        {loggedin ? (
          <div>
            <button
              onClick={() =>
                router.push(
                  "https://github.com/MehmetFaahem/TaskManager_Frontend"
                )
              }
              className="btn-primary mr-4"
            >
              Github
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                location.reload();
              }}
              className="btn-primary"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn-primary mr-4"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-200"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        )}
      </header>
      <main className="flex flex-col items-center justify-center flex-1 px-4">
        <h2 className="text-4xl font-bold text-white mb-6">
          Welcome to Task Manager
        </h2>
        <p className="text-xl w-full md:w-[60%] lg:w-[50%] text-center text-white/80 mb-12">
          This task manager is created as coding test for MERN Stack Developer
          Internship. Here backend created with Express.JS and Frontend created
          with Next.JS 14. Database: MongoDB
        </p>

        {loggedin ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => router.push("/create")}
              className="w-48 hover:bg-[#252d6d] transition-all cursor-pointer h-48 bg-[#131938] border border-white/10 rounded-lg shadow-lg flex justify-center items-center group"
            >
              <p className="text-lg font-semibold text-white group-hover:scale-105 transition-transform">
                Create Tasks
              </p>
            </div>
            <div
              onClick={() => router.push("/tasks")}
              className="w-48 hover:bg-[#252d6d] transition-all cursor-pointer h-48 bg-[#131938] border border-white/10 rounded-lg shadow-lg flex justify-center items-center group"
            >
              <p className="text-lg font-semibold text-white group-hover:scale-105 transition-transform">
                Read Tasks
              </p>
            </div>
            <div
              onClick={() => router.push("/tasks")}
              className="w-48 hover:bg-[#252d6d] transition-all cursor-pointer h-48 bg-[#131938] border border-white/10 rounded-lg shadow-lg flex justify-center items-center group"
            >
              <p className="text-lg font-semibold text-white group-hover:scale-105 transition-transform">
                Update Tasks
              </p>
            </div>
            <div
              onClick={() => router.push("/tasks")}
              className="w-48 hover:bg-[#252d6d] transition-all cursor-pointer h-48 bg-[#131938] border border-white/10 rounded-lg shadow-lg flex justify-center items-center group"
            >
              <p className="text-lg font-semibold text-white group-hover:scale-105 transition-transform">
                Delete Tasks
              </p>
            </div>
          </div>
        ) : (
          <div className="space-x-4">
            <button
              className="btn-primary"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-200"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        )}
      </main>
      <footer className="w-full text-center text-white/60 py-4 bg-[#252d6d]/90 backdrop-blur-sm">
        <p>&copy; 2024 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
