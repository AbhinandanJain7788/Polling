// src/components/TeacherPollSetup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
// At top of StudentPoll.jsx
import socket from "../socket";




const TeacherPollSetup = () => {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "", isCorrect: false }]);
  const [duration, setDuration] = useState(60);

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, { text: "", isCorrect: false }]);
    }
  };

  const updateOption = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    const validOptions = options.filter((opt) => opt.text.trim() !== "");
    if (!question.trim() || validOptions.length < 2) {
      alert("Please enter a question and at least 2 valid options.");
      return;
    }

    const poll = {
      id: Date.now(), // for tracking
      question: question.trim(),
      options: validOptions.map((o) => o.text.trim()),
      duration,
      correctAnswers: validOptions
        .filter((o) => o.isCorrect)
        .map((o) => o.text.trim()),
    };

    // socket.emit("new-question", poll);
    socket.emit("teacher-send-question", poll);

    navigate("/teacher/live");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
        <span className="text-sm font-semibold text-purple-600">🌐 Intervue Poll</span>
        <h2 className="text-2xl font-bold mt-2 mb-4">Let’s <span className="text-black">Get Started</span></h2>
        <p className="text-sm text-gray-500 mb-6">
          Create and manage polls, ask questions, and monitor responses.
        </p>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Enter your question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={100}
            placeholder="Type your question here..."
            className="w-full border border-gray-300 rounded-md p-3"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Timer</label>
          <select
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-48 border border-gray-300 p-2 rounded-md"
          >
            {[30, 45, 60, 90].map((val) => (
              <option key={val} value={val}>{val} seconds</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Edit Options</label>
          {options.map((opt, index) => (
            <div key={index} className="flex items-center gap-3 mb-2">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={opt.text}
                onChange={(e) => updateOption(index, "text", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={opt.isCorrect}
                  onChange={(e) => updateOption(index, "isCorrect", e.target.checked)}
                />
                Correct
              </label>
            </div>
          ))}

          {options.length < 6 && (
            <button
              onClick={addOption}
              className="mt-2 text-sm text-purple-600 underline"
            >
              + Add more option
            </button>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
        >
          Ask Question
        </button>
      </div>
    </div>
  );
};

export default TeacherPollSetup;
