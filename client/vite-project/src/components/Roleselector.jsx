// src/components/RoleSelector.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleSelector = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      sessionStorage.setItem("role", selectedRole);
      if (selectedRole === "student") {
        navigate("/student/onboarding");
      } else {
        navigate("/teacher/setup");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8 text-center">
        <span className="text-sm font-semibold text-purple-600">🌐 Intervue Poll</span>
        <h2 className="text-2xl font-bold mt-2 mb-1">Welcome to the <span className="text-black">Live Polling System</span></h2>
        <p className="text-gray-500 text-sm mb-8">
          Please select the role that best describes you to begin using the live polling system
        </p>

        <div className="flex gap-4 mb-6 justify-center">
          <div
            className={`border p-4 rounded-md w-full cursor-pointer ${
              selectedRole === "student" ? "border-purple-600 bg-purple-50" : "border-gray-300"
            }`}
            onClick={() => setSelectedRole("student")}
          >
            <h3 className="font-medium mb-1">I’m a Student</h3>
            <p className="text-xs text-gray-500">
              Participate in live polls and view results.
            </p>
          </div>

          <div
            className={`border p-4 rounded-md w-full cursor-pointer ${
              selectedRole === "teacher" ? "border-purple-600 bg-purple-50" : "border-gray-300"
            }`}
            onClick={() => setSelectedRole("teacher")}
          >
            <h3 className="font-medium mb-1">I’m a Teacher</h3>
            <p className="text-xs text-gray-500">
              Submit questions and view real-time results.
            </p>
          </div>
        </div>

        <button
          disabled={!selectedRole}
          onClick={handleContinue}
          className={`w-full py-2 text-white font-semibold rounded-md ${
            selectedRole ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
