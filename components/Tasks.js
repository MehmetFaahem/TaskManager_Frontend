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

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="mt-8 flex justify-center items-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl border-2 transition-all ${
                currentPage === i + 1
                  ? "border-white/40 bg-white/20 text-white"
                  : "border-white/10 hover:border-white/30 text-white/60 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <EditTaskModal
        taskID={taskID}
        taskTitle={taskTitle}
        taskDesc={taskDesc}
        opened={opened}
        onClose={() => setOpened(false)}
      />
      <ul className="space-y-6">
        {paginatedTasks.map((task) => (
          <div
            key={task._id}
            className="group hover:scale-[1.02] transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-[#131938]/90 to-[#252d6d]/90 p-8 rounded-2xl border border-white/20 shadow-xl backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-all">
                    {task.title}
                  </h3>
                  <p className="text-white/60 text-sm mt-2">
                    Created on {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-4 py-2 text-sm font-medium text-white/60 bg-white/10 rounded-xl border border-white/10">
                  Task #{task._id.slice(-4)}
                </span>
              </div>
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                {task.description}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={async () => {
                    await setTaskID(task._id);
                    await setTaskTitle(task.title);
                    await setTaskDesc(task.description);
                    setOpened(true);
                  }}
                  className="flex-1 btn-primary bg-gradient-to-r from-[#252d6d] to-[#1f2758] hover:from-[#1f2758] hover:to-[#252d6d] group"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </span>
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  disabled={isDeleting && deletingId === task._id}
                  className="flex-1 px-4 py-3 text-sm font-medium text-white/90 border-2 border-red-500/30 rounded-xl hover:bg-red-500/20 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting && deletingId === task._id ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Deleting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5 group-hover:scale-110 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </ul>
      <Pagination />
    </div>
  );
};

export default Tasks;
