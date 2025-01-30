"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateTaskForm = () => {
  const router = useRouter();
  const [inputdata, setInputdata] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    const token = await localStorage.getItem("token");
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://tmbackend.vercel.app/api/tasks",
        inputdata,
        {
          headers: {
            tokenHeaderKey: token,
          },
        }
      );
      console.log(response.data);
      setInputdata({
        title: "",
        description: "",
      });
      setLoading(false);
      router.push("/tasks");
    } catch (error) {
      if (
        error.response.data.msg == "Token is not valid" ||
        "No token, authorization denied"
      ) {
        alert("Sorry Your Login Session Is Expired");
        localStorage.removeItem("token");
        router.push("/login");
      }
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col sm:flex-row sticky space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        <button
          onClick={() => router.push("/")}
          className="btn-primary w-full sm:w-[300px]"
        >
          HomePage
        </button>
        <button
          onClick={() => router.push("/tasks")}
          className="btn-primary w-full sm:w-[300px]"
        >
          Read Tasks
        </button>
      </div>
      <h3 className="text-2xl font-bold text-white mb-6">Create New Task</h3>
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputdata.title}
          onChange={(e) =>
            setInputdata({ ...inputdata, title: e.target.value })
          }
          placeholder="Enter task title"
          className="input-field w-full"
          required
        />
        <textarea
          type="text"
          value={inputdata.description}
          onChange={(e) =>
            setInputdata({ ...inputdata, description: e.target.value })
          }
          placeholder="Enter task description"
          className="input-field w-full h-[200px] resize-none"
          required
        />
        <button
          disabled={loading}
          type="submit"
          className={`btn-primary w-full flex justify-center items-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          ) : (
            "Create Task"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
