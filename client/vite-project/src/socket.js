// // socket.js
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000"); // or your hosted backend URL

// export default socket;


import { io } from "socket.io-client";
const socket = io("https://polling-nysz.onrender.com");

export default socket;

