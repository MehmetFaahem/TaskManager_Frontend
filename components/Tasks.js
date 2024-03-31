import axios from "axios";
import React, { useState } from "react";
import EditTaskModal from "./editTaskModal";

const Tasks = ({ tasks }) => {
  const [opened, setOpened] = useState(false);
  const handleDelete = async (id) => {
    const token = await localStorage.getItem("token");
    try {
      await axios.delete(`https://tmbackend.vercel.app/api/tasks/${id}`, {
        headers: {
          tokenHeaderKey: token,
        },
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <div key={task._id} className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
            <p className="text-gray-700 mb-4">{task.description}</p>

            <EditTaskModal
              taskId={task._id}
              opened={opened}
              onClose={() => setOpened(false)}
            />
            <div className="flex justify-between">
              <button
                onClick={() => setOpened(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
