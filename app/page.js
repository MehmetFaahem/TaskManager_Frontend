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
      <header className="w-full flex justify-between items-center px-8 py-6 bg-gradient-to-r from-[#131938] to-[#252d6d] shadow-lg backdrop-blur-sm border-b border-white/10">
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
            <button className="btn-primary mr-4" onClick={handleLoginClick}>
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
          This task manager is created as coding test for MERN Stack Developer position. Here backend created with Express.JS and Frontend created
          with Next.JS 14. Database: MongoDB
        </p>

        {loggedin ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => router.push("/create")}
              className="w-48 group hover:scale-105 transition-all duration-300 cursor-pointer h-48 bg-gradient-to-br from-[#1a2346] to-[#252d6d] border border-white/20 rounded-2xl shadow-xl flex flex-col justify-center items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5v14m8-7h-2m0 0h-2m2 0v2m0-2v-2M3 11h6m-6 4h6m11 4H4c-.55228 0-1-.4477-1-1V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-white">Create Tasks</p>
            </div>
            <div
              onClick={() => router.push("/tasks")}
              className="w-48 group hover:scale-105 transition-all duration-300 cursor-pointer h-48 bg-gradient-to-br from-[#1a2346] to-[#252d6d] border border-white/20 rounded-2xl shadow-xl flex flex-col justify-center items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
                    clip-rule="evenodd"
                  />
                  <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-white">Read Tasks</p>
            </div>
            <div
              onClick={() => router.push("/tasks")}
              className="w-48 group hover:scale-105 transition-all duration-300 cursor-pointer h-48 bg-gradient-to-br from-[#1a2346] to-[#252d6d] border border-white/20 rounded-2xl shadow-xl flex flex-col justify-center items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11 4a1 1 0 0 0-1 1v10h10.459l.522-3H16a1 1 0 1 1 0-2h5.33l.174-1H16a1 1 0 1 1 0-2h5.852l.117-.67v-.003A1.983 1.983 0 0 0 20.06 4H11ZM9 18c0-.35.06-.687.17-1h11.66c.11.313.17.65.17 1v1a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-1Zm-6.991-7a17.8 17.8 0 0 0 .953 6.1c.198.54 1.61.9 2.237.9h1.34c.17 0 .339-.032.495-.095a1.24 1.24 0 0 0 .41-.27c.114-.114.2-.25.254-.396a1.01 1.01 0 0 0 .055-.456l-.242-2.185a1.073 1.073 0 0 0-.395-.71 1.292 1.292 0 0 0-.819-.286H5.291c-.12-.863-.17-1.732-.145-2.602-.024-.87.024-1.74.145-2.602H6.54c.302 0 .594-.102.818-.286a1.07 1.07 0 0 0 .396-.71l.24-2.185a1.01 1.01 0 0 0-.054-.456 1.088 1.088 0 0 0-.254-.397 1.223 1.223 0 0 0-.41-.269A1.328 1.328 0 0 0 6.78 4H4.307c-.3-.001-.592.082-.838.238a1.335 1.335 0 0 0-.531.634A17.127 17.127 0 0 0 2.008 11Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-white">Update Tasks</p>
            </div>
            <div
              onClick={() => router.push("/tasks")}
              className="w-48 group hover:scale-105 transition-all duration-300 cursor-pointer h-48 bg-gradient-to-br from-[#1a2346] to-[#252d6d] border border-white/20 rounded-2xl shadow-xl flex flex-col justify-center items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-1 9a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Zm2-5a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm4 4a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0v-3Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-white">Delete Tasks</p>
            </div>
          </div>
        ) : (
          <div className="space-x-4">
            <button className="btn-primary" onClick={handleLoginClick}>
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
        <p>&copy; 2025 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
