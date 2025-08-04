
// import { useEffect, useState } from "react";
// import socket from "../socket";

// const TeacherLiveDashboard = () => {
//   const [participants, setParticipants] = useState([]);
//   const [results, setResults] = useState([]);
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     // Listen to updates when new participants join or leave
//     socket.on("update-participants", (names) => {
//         console.log("Received participants:", names); 
//       setParticipants(names);
//     });

//     // Listen to poll results to update live
//     socket.on("poll-results", (res) => {
//       setResults(res);
//     });

//     // Listen to question updates to show options
//     socket.on("new-question", (q) => {
//       setOptions(q.options);
//     });

//     return () => {
//       socket.off("update-participants");
//       socket.off("poll-results");
//       socket.off("new-question");
//     };
//   }, []);

//   const handleKick = (name) => {
//     const confirmKick = window.confirm(`Remove "${name}" from the poll?`);
//     if (confirmKick) {
//       socket.emit("kick-student", name);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-6">Live Dashboard</h1>

//       {/* Participants */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Participants</h2>
//         {participants.length === 0 ? (
//           <p className="text-gray-500">No students connected yet.</p>
//         ) : (
//           <ul className="space-y-2">
//             {participants.map((name, idx) => (
//               <li
//                 key={idx}
//                 className="flex justify-between items-center bg-white px-4 py-2 rounded shadow"
//               >
//                 <span>{name}</span>
//                 <button
//                   onClick={() => handleKick(name)}
//                   className="text-sm bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Kick
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Live Poll Results */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Live Poll Results</h2>
//         {results.length === 0 ? (
//           <p className="text-gray-500">No responses yet.</p>
//         ) : (
//           <div className="space-y-2">
//             {results.map((count, idx) => (
//               <div key={idx} className="flex justify-between bg-white px-4 py-2 rounded shadow">
//                 <span>{options[idx]}</span>
//                 <span>{count} votes</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeacherLiveDashboard;








// import { useEffect, useState } from "react";
// import socket from "../socket";

// const TeacherLiveDashboard = () => {
//   const [participants, setParticipants] = useState([]);
//   const [results, setResults] = useState([]);
//   const [pastPolls, setPastPolls] = useState([]);

//   useEffect(() => {
//     socket.emit("teacher-join"); // 🟢 Request past polls

//     socket.on("update-participants", (names) => {
//       setParticipants(names);
//     });

//     socket.on("poll-results", (res) => {
//       setResults(res);
//     });

//     socket.on("past-polls", (polls) => {
//       setPastPolls(polls);
//     });

//     return () => {
//       socket.off("update-participants");
//       socket.off("poll-results");
//       socket.off("past-polls");
//     };
//   }, []);

//   const handleReAsk = (poll) => {
//     socket.emit("reask-question", poll);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Live Dashboard</h1>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Participants</h2>
//         {participants.length === 0 ? (
//           <p className="text-gray-500">No students connected yet.</p>
//         ) : (
//           <ul className="list-disc list-inside">
//             {participants.map((name, i) => (
//               <li key={i}>{name}</li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Live Poll Results</h2>
//         {results.length > 0 ? (
//           <ul>
//             {results.map((votes, i) => (
//               <li key={i}>Option {i + 1}: {votes} vote(s)</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No results yet.</p>
//         )}
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Past Polls</h2>
//         {pastPolls.length === 0 ? (
//           <p className="text-gray-500">No previous polls yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {pastPolls.map((poll, index) => (
//               <div
//                 key={index}
//                 className="border rounded-xl p-4 shadow bg-white space-y-2"
//               >
//                 <p className="font-semibold">Q: {poll.question}</p>
//                 <ul className="ml-4">
//                   {poll.options.map((opt, idx) => (
//                     <li key={idx}>
//                       {opt} — {poll.results?.[idx] || 0} votes
//                     </li>
//                   ))}
//                 </ul>
//                 <button
//                   onClick={() => handleReAsk(poll)}
//                   className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Re-Ask This Question
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeacherLiveDashboard;









// import { useEffect, useState } from "react";
// import socket from "../socket";

// const TeacherLiveDashboard = () => {
//   const [participants, setParticipants] = useState([]);
//   const [results, setResults] = useState([]);
//   const [pastPolls, setPastPolls] = useState([]);

//   useEffect(() => {
//     socket.emit("teacher-join"); // 🟢 Request past polls

//     socket.on("update-participants", (names) => {
//       setParticipants(names);
//     });

//     socket.on("poll-results", (res) => {
//       setResults(res);
//     });

//     socket.on("past-polls", (polls) => {
//       setPastPolls(polls);
//     });

//     return () => {
//       socket.off("update-participants");
//       socket.off("poll-results");
//       socket.off("past-polls");
//     };
//   }, []);

//   const handleReAsk = (poll) => {
//     socket.emit("reask-question", poll);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Live Dashboard</h1>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Participants</h2>
//         {participants.length === 0 ? (
//           <p className="text-gray-500">No students connected yet.</p>
//         ) : (
//           <ul className="list-disc list-inside">
//             {participants.map((name, i) => (
//               <li key={i}>{name}</li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Live Poll Results</h2>
//         {results.length > 0 ? (
//           <ul>
//             {results.map((votes, i) => (
//               <li key={i}>Option {i + 1}: {votes} vote(s)</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No results yet.</p>
//         )}
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Past Polls</h2>
//         {pastPolls.length === 0 ? (
//           <p className="text-gray-500">No previous polls yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {pastPolls.map((poll, index) => (
//               <div
//                 key={index}
//                 className="border rounded-xl p-4 shadow bg-white space-y-2"
//               >
//                 <p className="font-semibold">Q: {poll.question}</p>
//                 <ul className="ml-4">
//                   {poll.options.map((opt, idx) => (
//                     <li key={idx}>
//                       {opt} — {poll.results?.[idx] || 0} votes
//                     </li>
//                   ))}
//                 </ul>
//                 <button
//                   onClick={() => handleReAsk(poll)}
//                   className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Re-Ask This Question
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeacherLiveDashboard;






import { useEffect, useState } from "react";
import socket from "../socket";

const TeacherLiveDashboard = () => {
  const [participants, setParticipants] = useState([]);
  const [results, setResults] = useState([]);
  const [pastPolls, setPastPolls] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [optionInputs, setOptionInputs] = useState(["", ""]);

  // 🔁 Join as teacher and fetch past data
  useEffect(() => {
    socket.emit("teacher-join");

    socket.on("update-participants", (names) => {
      setParticipants(names);
    });

    socket.on("poll-results", (res) => {
      setResults(res);
    });

    socket.on("past-polls", (polls) => {
      setPastPolls(polls);
    });

    return () => {
      socket.off("update-participants");
      socket.off("poll-results");
      socket.off("past-polls");
    };
  }, []);

  // 🚀 Ask New Poll
  const sendNewPoll = () => {
    const question = questionText.trim();
    const options = optionInputs.map((opt) => opt.trim()).filter((opt) => opt.length > 0);
    if (!question || options.length < 2) return alert("Enter valid question and at least 2 options.");
    socket.emit("teacher-send-question", { question, options });
    setQuestionText("");
    setOptionInputs(["", ""]);
    setShowQuestionForm(false);
  };

  // 🔄 Re-Ask a Past Poll
  const handleReAsk = (poll) => {
    socket.emit("reask-question", poll);
  };

  // ❌ Kick student by name
  const kickStudent = (name) => {
    if (window.confirm(`Kick out "${name}"?`)) {
      socket.emit("kick-student", name);
    }
  };

  // ➕ Add option input
  const addOptionField = () => {
    if (optionInputs.length < 6) {
      setOptionInputs([...optionInputs, ""]);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Live Dashboard</h1>

      {/* 📋 Participants */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Participants</h2>
        {participants.length === 0 ? (
          <p className="text-gray-500">No students connected yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {participants.map((name, i) => (
              <li key={i} className="flex justify-between items-center bg-white px-4 py-2 rounded-md shadow">
                <span>{name}</span>
                <button
                  onClick={() => kickStudent(name)}
                  className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Kick
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 📊 Live Poll Results */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Live Poll Results</h2>
        {results.length > 0 ? (
          <ul className="bg-white p-4 rounded-lg shadow space-y-2">
            {results.map((votes, i) => (
              <li key={i}>Option {i + 1}: {votes} vote(s)</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No results yet.</p>
        )}
      </div>

      {/* ➕ Ask New Question */}
      <div className="mb-6">
        <button
          onClick={() => setShowQuestionForm(!showQuestionForm)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showQuestionForm ? "Cancel" : "Ask New Question"}
        </button>

        {showQuestionForm && (
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter your question"
              className="w-full border px-3 py-2 rounded"
            />
            {optionInputs.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                value={opt}
                onChange={(e) => {
                  const copy = [...optionInputs];
                  copy[idx] = e.target.value;
                  setOptionInputs(copy);
                }}
                placeholder={`Option ${idx + 1}`}
                className="w-full border px-3 py-2 rounded"
              />
            ))}
            <button
              onClick={addOptionField}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add another option
            </button>

            <button
              onClick={sendNewPoll}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Send Poll
            </button>
          </div>
        )}
      </div>

     
      {/* 📜 Past Polls */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Past Polls</h2>
        {pastPolls.length === 0 ? (
          <p className="text-gray-500">No previous polls yet.</p>
        ) : (
          <div className="space-y-4">
            {pastPolls.map((poll, index) => (
              <div key={index} className="border p-4 bg-white rounded-xl shadow space-y-2">
                <p className="font-semibold">Q: {poll.question}</p>
                <ul className="ml-4">
                  {poll.options.map((opt, idx) => (
                    <li key={idx}>
                      {opt} — {poll.results?.[idx] || 0} votes
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleReAsk(poll)}
                  className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Re-Ask This Question
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherLiveDashboard;
