import CreateTaskForm from "@/components/createTaskForm";
import React from "react";

function Create() {
  return (
    <div className="min-h-screen bg-[#131938] flex flex-col justify-center items-center py-6 px-4">
      <div className="w-full md:w-2/3 lg:w-1/2 card">
        <CreateTaskForm />
      </div>
    </div>
  );
}

export default Create;
