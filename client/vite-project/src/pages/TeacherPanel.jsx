// import { useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000"); // backend URL

// const TeacherPanel = () => {
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleSendPoll = () => {
//     if (question.trim() && options.every((opt) => opt.trim())) {
//       const payload = {
//         question,
//         options,
//       };
//       socket.emit("teacher-send-question", payload);
//       alert("Poll sent to all students!");
//       setQuestion("");
//       setOptions(["", "", "", ""]);
//     } else {
//       alert("Please fill all fields.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
//         <h2 className="text-2xl font-bold mb-6 text-center">Teacher Panel</h2>

//         <input
//           type="text"
//           placeholder="Enter your question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
//         />

//         {options.map((opt, idx) => (
//           <input
//             key={idx}
//             type="text"
//             placeholder={`Option ${idx + 1}`}
//             value={opt}
//             onChange={(e) => handleOptionChange(idx, e.target.value)}
//             className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
//           />
//         ))}

//         <button
//           onClick={handleSendPoll}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//         >
//           Send Poll
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TeacherPanel;








import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const TeacherPanel = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);

  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const handleSendPoll = () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) {
      alert("Please fill all fields.");
      return;
    }

    const poll = { question, options };
    socket.emit("teacher-send-question", poll);
    alert("Poll sent to all students!");
    setQuestion("");
    setOptions(["", "", "", ""]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Teacher Panel</h2>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
          />
        ))}
        <button
          onClick={handleSendPoll}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Send Poll
        </button>
      </div>
    </div>
  );
};

export default TeacherPanel;
