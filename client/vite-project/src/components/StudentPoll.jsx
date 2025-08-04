// // src/components/StudentPoll.jsx
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// // At top of StudentPoll.jsx
// import socket from "../socket";

// // Adjust the backend URL accordingly

// const StudentPoll = () => {
//   const name = sessionStorage.getItem("studentName");
//   const [questionData, setQuestionData] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [hasSubmitted, setHasSubmitted] = useState(false);
//   const [results, setResults] = useState(null);

//   useEffect(() => {
//     console.log("👋 Student joining socket room");
//     socket.emit("join-student",name);
//     // Listen for question from teacher
//     socket.on("new-question", (data) => {
//       setQuestionData(data);
//       setTimeLeft(data.duration || 60); // default to 60s
//       setHasSubmitted(false);
//       setSelectedOption(null);
//       setResults(null);
//     });

//     // Listen for results
//     socket.on("poll-results", (data) => {
//       setResults(data);
//     });

//     return () => {
//       socket.off("new-question");
//       socket.off("poll-results");
//     };
//   }, []);

//   // Timer logic
//   useEffect(() => {
//     if (timeLeft > 0 && !hasSubmitted) {
//       const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
//       return () => clearTimeout(timer);
//     }

//     if (timeLeft === 0 && !hasSubmitted) {
//       handleSubmit(); // auto-submit if time runs out
//     }
//   }, [timeLeft, hasSubmitted]);

//   const handleSubmit = () => {
//     if (selectedOption !== null) {
//       socket.emit("submit-answer", {
//         name,
//         answer: questionData.options[selectedOption],
//         questionId: questionData.id, // add an ID to each poll on server
//       });
//     }
//     setHasSubmitted(true);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6 text-center">
//         <span className="text-sm font-semibold text-purple-600">🌐 Intervue Poll</span>
//         <h2 className="text-2xl font-bold mt-2">Welcome, {name}</h2>

//         {!questionData ? (
//           <p className="mt-6 text-gray-500">Waiting for the teacher to ask questions..</p>
//         ) : (
//           <>
//             <div className="mt-6 text-left">
//               <p className="text-lg font-semibold mb-1">{questionData.question}</p>
//               {!hasSubmitted && (
//                 <p className="text-sm text-gray-500 mb-3">Time left: {timeLeft}s</p>
//               )}
//             </div>

//             {!hasSubmitted ? (
//               <>
//                 <div className="space-y-2 text-left">
//                   {questionData.options.map((opt, idx) => (
//                     <div
//                       key={idx}
//                       className={`border p-3 rounded-md cursor-pointer ${
//                         selectedOption === idx
//                           ? "bg-purple-100 border-purple-600"
//                           : "border-gray-300"
//                       }`}
//                       onClick={() => setSelectedOption(idx)}
//                     >
//                       {opt}
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   onClick={handleSubmit}
//                   disabled={selectedOption === null}
//                   className="w-full bg-purple-600 text-white mt-5 py-2 rounded-md disabled:opacity-50"
//                 >
//                   Submit
//                 </button>
//               </>
//             ) : results ? (
//               <div className="mt-6">
//                 <h3 className="font-semibold mb-3">Live Poll Results</h3>
//                 {questionData.options.map((opt, idx) => {
//                   const count = results[opt] || 0;
//                   const total = Object.values(results).reduce((a, b) => a + b, 0);
//                   const percent = total ? Math.round((count / total) * 100) : 0;

//                   return (
//                     <div key={idx} className="mb-2 text-left">
//                       <p className="mb-1">{opt}</p>
//                       <div className="w-full bg-gray-200 h-4 rounded-full">
//                         <div
//                           className="bg-purple-600 h-4 rounded-full"
//                           style={{ width: `${percent}%` }}
//                         ></div>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">{percent}%</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <p className="mt-4 text-gray-500">Waiting for results...</p>
//             )}
//           </>
//         )}
        
//       </div>
//     </div>
//   );
// };

// export default StudentPoll;



// components/StudentPoll.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

const StudentPoll = () => {
  const navigate = useNavigate();
  const name = sessionStorage.getItem("studentName");

  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!name) {
      navigate("/student/onboarding");
      return;
    }
    console.log("Sending join-student with name:", name);  
    socket.emit("join-student", name);

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
      socket.off("new-question");
      socket.off("poll-results");
      socket.off("kicked");
    };
  }, []);

//   useEffect(() => {
//     if (!hasSubmitted && timeLeft > 0) {
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);

//       if (timeLeft === 0) {
//         setHasSubmitted(true);
//       }

//       return () => clearInterval(timer);
//     }
//   }, [timeLeft, hasSubmitted]);

useEffect(() => {
    if (!hasSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !hasSubmitted) {
      // Auto submit nothing or default value (optional)
      setHasSubmitted(true);
      socket.emit("submit-answer", null); // or -1
      socket.emit("end-question");        // ✅ End the poll from student
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

export default StudentPoll;
