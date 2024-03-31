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
          className={`mx-1 px-3 py-1 rounded-md ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800"
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
    };
    fetchTasks();
  }, [tasks]);

  return (
    <div className="min-h-screen min-w-full bg-gray-100 flex flex-col justify-center items-center py-6">
      <div className="flex sticky space-x-4 mb-4">
        <button
          onClick={() => router.push("/")}
          className="mt-2 w-[300px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          HomePage
        </button>
        <button
          onClick={() => router.push("/create")}
          className="mt-2 w-[300px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Create Task
        </button>
      </div>
      <div className="w-full md:w-1/2 bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Tasks</h2>
        {tasks.length < 1 ? (
          <h2 className="font-bold text-2xl text-center py-[20%]">
            There is no enough task was created. Please create at least number
            of task first.
          </h2>
        ) : (
          <Tasks tasks={tasks} />
        )}
      </div>
      <h5 className="mt-1">
        Page Item Limit is only 2, If your task length is greater than 2 then
        use paginate
      </h5>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Previous
        </button>
        <div className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
          {renderPageNumbers()}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TasksPage;
