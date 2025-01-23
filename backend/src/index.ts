import { WebSocketServer, WebSocket } from "ws";
import express from "express";




const app = express();
const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSocks: User[] = [];

wss.on("connection", (socket) => {
  console.log("Device connected!!");

  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());
    console.log(parsedMessage);

    if (parsedMessage.type === "join") {
      // Add user to the room
      allSocks.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    } else if (parsedMessage.type === "chat") {
      let currentUserRoom = null;

      // Find the room of the current user
      for (let i = 0; i < allSocks.length; i++) {
        if (allSocks[i].socket === socket) {
          currentUserRoom = allSocks[i].room;
          break;
        }
      }

      // Broadcast message to all users in the same room, but skip the sender
      for (let i = 0; i < allSocks.length; i++) {
        if (allSocks[i].room === currentUserRoom && allSocks[i].socket !== socket) {
          allSocks[i].socket.send(parsedMessage.payload.message);
        }
      }
    }
  });

  socket.on("close", () => {
    // Remove the disconnected socket
    allSocks = allSocks.filter((user) => user.socket !== socket);
  });

  socket.on("error", (err) => {
    console.log("Getting error->",)
  });
});

app.get("/", (req, res) => {
  res.json({ msg: "Just Go A Head! Do Whatever You" });
});

app.listen(3000, () => {
  console.log("Express started!! :Hi Archie");
});
