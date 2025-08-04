// src/components/StudentNameEntry.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentNameEntry = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (name.trim()) {
      sessionStorage.setItem("studentName", name.trim());
      navigate("/student");
    }
    sessionStorage.setItem("studentName", name);
    navigate("/student");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center">
        <span className="text-sm font-semibold text-purple-600">🌐 Intervue Poll</span>
        <h2 className="text-2xl font-bold mt-2 mb-1">Let’s <span className="text-black">Get Started</span></h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your name to join the session and start participating in polls.
        </p>

        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleContinue}
          disabled={!name.trim()}
          className={`w-full py-2 text-white font-semibold rounded-md ${
            name.trim()
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-purple-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StudentNameEntry;
