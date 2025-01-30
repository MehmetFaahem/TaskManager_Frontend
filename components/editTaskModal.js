import React, { useState } from "react";
import axios from "axios";

const EditTaskModal = ({ taskID, taskTitle, taskDesc, onClose, opened }) => {
  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState(taskDesc);
  const [isUpdating, setIsUpdating] = useState(false);

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

  if (opened == false) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75" aria-hidden="true" onClick={onClose} />
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        
        <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#131938] border border-white/10 rounded-lg shadow-xl sm:align-middle">
          <div className="sm:flex sm:items-start">
            <div className="w-full">
              <h3 className="text-2xl font-bold text-white mb-6">
                Edit Task
              </h3>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-field w-full resize-none"
                    rows="4"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 sm:flex sm:flex-row-reverse gap-3">
            <button
              onClick={handleSubmit}
              disabled={isUpdating}
              type="button"
              className="btn-primary sm:w-auto"
            >
              {isUpdating ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Task"
              )}
            </button>
            <button
              onClick={onClose}
              type="button"
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-200 flex justify-center items-center"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
