"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Tasks from "@/components/Tasks";
import { useRouter } from "next/navigation";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const pageSize = 10;

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 px-3 py-1 rounded-lg ${
            currentPage === i
              ? "bg-[#252d6d] text-white"
              : "bg-[#131938] text-white/80 hover:bg-[#252d6d] hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await localStorage.getItem("token");
        const response = await axios.get(
          `https://tmbackend.vercel.app/api/tasks?page=${currentPage}&pageSize=${pageSize}`,
          {
            headers: {
              tokenHeaderKey: token,
            },
          }
        );
        setTasks(response.data);
      } catch (error) {
        if (
          error.response.data.msg == "Token is not valid" ||
          "No token, authorization denied"
        ) {
          alert("Sorry Your Login Session Is Expired");
          localStorage.removeItem("token");
          router.push("/login");
        }
      }
    };
    fetchTasks();
  }, [tasks]);

  return (
    <div className="min-h-screen min-w-full bg-[#131938] flex flex-col justify-center items-center py-6 px-4">
      <div className="flex flex-col sm:flex-row sticky space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        <button
          onClick={() => router.push("/")}
          className="btn-primary w-full sm:w-[300px]"
        >
          HomePage
        </button>
        <button
          onClick={() => router.push("/create")}
          className="btn-primary w-full sm:w-[300px]"
        >
          Create Task
        </button>
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 card">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Tasks
        </h2>
        {tasks.length < 1 ? (
          <h2 className="font-bold text-xl text-center py-[20%] text-white/80 flex flex-col items-center justify-center gap-4">
            <svg
              class="size-[200px] text-gray-800 dark:text-white"
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
                stroke-width="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
            There are no tasks created yet. Please create at least one task
            first.
          </h2>
        ) : (
          <Tasks tasks={tasks} />
        )}
      </div>
      {tasks.length > 2 && (
        <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`btn-primary ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <div className="flex flex-wrap justify-center gap-2">
            {renderPageNumbers()}
          </div>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn-primary"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
