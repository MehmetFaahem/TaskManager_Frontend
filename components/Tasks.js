import axios from "axios";
import React, { useState } from "react";
import EditTaskModal from "./editTaskModal";

const Tasks = ({ tasks }) => {
  const [opened, setOpened] = useState(false);
  const [taskID, setTaskID] = useState();
  const [taskTitle, setTaskTitle] = useState();
  const [taskDesc, setTaskDesc] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    const token = await localStorage.getItem("token");
    try {
      setIsDeleting(true);
      setDeletingId(id);
      await axios.delete(`https://tmbackend.vercel.app/api/tasks/${id}`, {
        headers: {
          tokenHeaderKey: token,
        },
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="container mx-auto">
      <ul className="space-y-4">
        {tasks.map((task) => (
          <div key={task._id} className="bg-[#131938]/50 border border-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-[#131938]/70">
            <h3 className="text-xl font-bold mb-3 text-white">{task.title}</h3>
            <p className="text-white/80 mb-6 leading-relaxed">{task.description}</p>

            <EditTaskModal
              taskID={taskID}
              taskTitle={taskTitle}
              taskDesc={taskDesc}
              opened={opened}
              onClose={() => setOpened(false)}
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={async () => {
                  await setTaskID(task._id);
                  await setTaskTitle(task.title);
                  await setTaskDesc(task.description);
                  setOpened(true);
                }}
                className="btn-primary"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                disabled={isDeleting && deletingId === task._id}
                className="px-4 py-2 text-sm font-medium text-white border border-red-500/50 rounded-lg hover:bg-red-500/20 transition-colors duration-200 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting && deletingId === task._id ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
