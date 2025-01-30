import React, { useState, useEffect } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

const EditTaskModal = ({ taskID, taskTitle, taskDesc, onClose, opened }) => {
  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState(taskDesc);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (opened) {
      setTitle(taskTitle);
      setDescription(taskDesc);
    }
  }, [opened, taskTitle, taskDesc]);

  const handleSubmit = async () => {
    const token = await localStorage.getItem("token");
    try {
      setIsUpdating(true);
      await axios.put(
        `https://tmbackend.vercel.app/api/tasks/${taskID}`,
        {
          title,
          description,
        },
        {
          headers: {
            tokenHeaderKey: token,
          },
        }
      );
      onClose();
    } catch (error) {
      alert("Please write properly when updating");
      console.error("Error updating task:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!opened) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="min-h-screen px-4 text-center flex items-center justify-center">
        <div className="relative w-full max-w-2xl p-8 text-left transform bg-gradient-to-br from-[#131938] via-[#1a2346] to-[#252d6d]/90 border border-white/20 rounded-2xl shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white">Edit Task</h3>
            <p className="mt-2 text-white/60">Make changes to your task here</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-3 text-white placeholder-white/40 focus:border-white/40 focus:ring-2 focus:ring-white/10 focus:outline-none transition-all duration-300"
                placeholder="Enter task title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-3 text-white placeholder-white/40 focus:border-white/40 focus:ring-2 focus:ring-white/10 focus:outline-none transition-all duration-300 min-h-[120px] resize-none"
                placeholder="Enter task description"
                rows="4"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSubmit}
              disabled={isUpdating}
              className="flex-1 btn-primary bg-gradient-to-r from-[#252d6d] to-[#1f2758] hover:from-[#1f2758] hover:to-[#252d6d] group"
            >
              {isUpdating ? (
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
                  Updating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Changes
                </span>
              )}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-white/90 border-2 border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <span className="flex items-center justify-center gap-2">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default EditTaskModal;
