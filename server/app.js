import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js";
import nameRoutes from "./routes/nameRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js"
import dotenv from "dotenv";
import connectDb from "./config/db.js";

const PORT = 3000;
const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://192.168.231.104:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
dotenv.config(); // load variables into process.envnp
app.use(express.json());
app.use(cookieParser());

// db connection
connectDb();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.231.104:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//routes

app.use("/api/messages", messageRoutes);
app.use("/api/name", nameRoutes);// not functional
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);


app.get("/", (req, res) => {
  console.log("home route");
});



io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("message", ({ room, message, userName }) => {
    const messagePayload = {
      msg: message,
      room: room,
      userName: userName,
    };
    console.log(messagePayload);
    io.to(room).emit("receive-message", messagePayload);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);

    console.log("room joined", { room });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`server is listening on Port ${PORT}`);
});
