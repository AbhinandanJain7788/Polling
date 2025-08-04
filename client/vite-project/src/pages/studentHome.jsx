import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

const StudentHome = () => {
  const name = sessionStorage.getItem("studentName");
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      socket.emit("join-student", name);
    }

    socket.on("new-question", (q) => {
      setQuestion(q.question);
      setOptions(q.options);
      setSelectedOption(null);
      setTimeLeft(60);
      setHasSubmitted(false);
    });

    socket.on("poll-results", (res) => {
      setResults(res);
    });

    socket.on("kicked", () => {
      alert("You have been removed by the teacher.");
      sessionStorage.clear();
      navigate("/");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      if (timeLeft === 0) {
        setHasSubmitted(true);
      }

      return () => clearInterval(timer);
    }
  }, [timeLeft, hasSubmitted]);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setHasSubmitted(true);
      socket.emit("submit-answer", selectedOption);
    }
  };

  if (!question) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h1 className="text-xl font-semibold">Intervue Poll</h1>
          <p className="text-lg font-bold mt-4">Welcome, {name}</p>
          <p className="text-gray-500 mt-2">Waiting for the teacher to ask questions..</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome, {name}</h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl">
        {!hasSubmitted ? (
          <>
            <div className="mb-4">
              <p className="text-lg font-semibold">{question}</p>
              <p className="text-sm text-gray-500">Time left: {timeLeft}s</p>
            </div>

            <div className="space-y-3">
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`cursor-pointer p-3 border rounded-lg transition ${
                    selectedOption === idx
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
            >
              Submit
            </button>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold">Thank you for your response!</p>
            <div className="mt-4 space-y-2">
              {results.map((count, idx) => (
                <div key={idx} className="flex justify-between border p-2 rounded-md">
                  <span>{options[idx]}</span>
                  <span>{count} votes</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHome;
