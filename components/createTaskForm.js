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
      <div className="flex sticky space-x-4 mb-4">
        <button
          onClick={() => router.push("/")}
          className="mt-2 w-[300px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          HomePage
        </button>
        <button
          onClick={() => router.push("/tasks")}
          className="mt-2 w-[300px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Read Tasks
        </button>
      </div>
      <h3 className="text-lg font-semibold mb-2">Create New Task</h3>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputdata.title}
          onChange={(e) =>
            setInputdata({ ...inputdata, title: e.target.value })
          }
          placeholder="Enter task title"
          className="border border-gray-300 rounded-md py-2 px-4 block w-full"
          required
        />
        <textarea
          type="text"
          value={inputdata.description}
          onChange={(e) =>
            setInputdata({ ...inputdata, description: e.target.value })
          }
          placeholder="Enter task description"
          className="border h-[200px] border-gray-300 rounded-md py-2 px-4 block w-full"
          required
        />
        <button
          disabled={loading ? true : false}
          type="submit"
          className={`mt-2 ${
            !loading ? "cursor-pointer" : "cursor-not-allowed"
          } bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md`}
        >
          {loading ? "Creating" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
