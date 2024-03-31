import CreateTaskForm from "@/components/createTaskForm";
import React from "react";

function Create() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-6">
      <div className="w-full md:w-1/2 bg-white shadow-md rounded-md p-6">
        <CreateTaskForm />
      </div>
    </div>
  );
}

export default Create;
