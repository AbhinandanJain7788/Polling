



// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// app.use(cors());

// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   }
// });

// let currentQuestion = null;
// let answers = [];
// let participants = {}; // socket.id => name

// function broadcastParticipants() {
//   const names = Object.values(participants);
//   io.emit("update-participants", names);
// }

// function countVotes(optionCount) {
//   const result = Array(optionCount).fill(0);
//   answers.forEach((i) => {
//     if (result[i] !== undefined) result[i]++;
//   });
//   return result;
// }

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("join-student", (name) => {
//     console.log("✅ Student joined:", name); 
//     participants[socket.id] = name;
//     console.log(`Student joined: ${name}`);
//     broadcastParticipants();

//     // Emit latest question to student
//     if (currentQuestion) {
//       socket.emit("new-question", currentQuestion);
//       socket.emit("poll-results", countVotes(currentQuestion.options.length));
//     }
//   });

//   socket.on("teacher-send-question", (data) => {
//     currentQuestion = data;
//     answers = [];
//     io.emit("new-question", data);
//   });

//   socket.on("submit-answer", (index) => {
//     answers.push(index);
//     io.emit("poll-results", countVotes(currentQuestion.options.length));
//   });

//   socket.on("kick-student", (nameToKick) => {
//     const socketId = Object.keys(participants).find(
//       (id) => participants[id] === nameToKick
//     );

//     if (socketId) {
//       io.to(socketId).emit("kicked");
//       delete participants[socketId];
//       broadcastParticipants();
//     }
//   });

//   socket.on("disconnect", () => {
//     if (participants[socket.id]) {
//       console.log(`Disconnected: ${participants[socket.id]}`);
//       delete participants[socket.id];
//       broadcastParticipants();
//     } else {
//       console.log("Disconnected socket without name:", socket.id);
//     }
//   });
// });

// server.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });




const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let currentQuestion = null;
let answers = [];
let participants = {}; // socketId: name
let pastPolls = [];    // Array of { question, options, results }

function countVotes(optionCount) {
  const result = Array(optionCount).fill(0);
  answers.forEach((i) => {
    if (result[i] !== undefined) result[i]++;
  });
  return result;
}

function broadcastParticipants() {
  const names = Object.values(participants);
  io.emit("update-participants", names);
}

io.on("connection", (socket) => {
  console.log("🔗 Connected:", socket.id);

  socket.on("join-student", (name) => {
    participants[socket.id] = name;
    console.log("🧑‍🎓 Student joined:", name);
    broadcastParticipants();

    // Send current question if active
    if (currentQuestion) {
      socket.emit("new-question", currentQuestion);
      socket.emit("poll-results", countVotes(currentQuestion.options.length));
    }
  });

  socket.on("teacher-join", () => {
    console.log("👩‍🏫 Teacher joined");
    socket.emit("past-polls", pastPolls); // Send previous polls
  });

  socket.on("teacher-send-question", (data) => {
    currentQuestion = data;
    answers = [];
    io.emit("new-question", currentQuestion);
  });

  socket.on("submit-answer", (index) => {
    answers.push(index);
    const result = countVotes(currentQuestion.options.length);
    io.emit("poll-results", result);

    // Update live question result
    currentQuestion.results = result;
  });

  socket.on("end-question", () => {
    if (currentQuestion) {
      pastPolls.push({ ...currentQuestion, results: countVotes(currentQuestion.options.length) });
      currentQuestion = null;
      answers = [];
    }
  });

  socket.on("reask-question", (poll) => {
    currentQuestion = { question: poll.question, options: poll.options };
    answers = [];
    io.emit("new-question", currentQuestion);
  });

  socket.on("kick-student", (nameToKick) => {
    const id = Object.keys(participants).find((sid) => participants[sid] === nameToKick);
    if (id) {
      io.to(id).emit("kicked");
      delete participants[id];
      broadcastParticipants();
    }
  });

  socket.on("disconnect", () => {
    if (participants[socket.id]) {
      console.log("❌ Student left:", participants[socket.id]);
      delete participants[socket.id];
      broadcastParticipants();
    }
  });
});

server.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});
