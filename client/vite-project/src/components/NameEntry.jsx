// import { useState } from "react";
// import { useNavigate } from "react-router-dom";




// const NameEntry = () => {
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   const handleJoin = () => {
//     if (name.trim()) {
//       sessionStorage.setItem("studentName", name);
//       navigate("/student");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-6 text-center">Join the Poll</h2>
//         <input
//           type="text"
//           placeholder="Enter your name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           onClick={handleJoin}
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Join Poll
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NameEntry;








import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NameEntry = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (name.trim()) {
      sessionStorage.setItem("studentName", name);
      navigate("/student");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4">Join the Poll</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-blue-300 rounded-lg mb-4"
        />
        <button
          onClick={handleJoin}
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Join Poll
        </button>
      </div>
    </div>
  );
};

export default NameEntry;
