import React, { useState, useEffect, useMemo } from "react";
import { TextField, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const ChatRoom = () => {
  const { id } = useParams();

  const socket = useMemo(() => io("://httplocalhost:3000"), []);



  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      setRoom(id);
      setUserName(localStorage.getItem("userName"));
      socket.emit("join-room", id);
    });

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, [id, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room, userName });
    setMessage("");
  };

  return (
    <div className="h-[82vh] border flex flex-col p-4 gap-3 overflow-hidden">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl font-bold mb-1 text-white">Room Name: {id}</h1>
        <h2 className="text-sm opacity-70 mb-2 text-white">
          Socket ID: {socketId}
        </h2>
        <Typography variant="h6" gutterBottom className="text-white">
          Welcome to Socket.io
        </Typography>
      </div>

      {/* Chat Box */}
      <div className="flex flex-col w-full flex-1 max-w-3xl mx-auto bg-base-100 shadow-xl rounded-2xl overflow-hidden">
        {/* Top Bar */}
        <div className="p-4 bg-primary text-primary-content text-lg font-semibold flex justify-between items-center">
          <span>💬 Chat Room</span>
          <span className="text-sm opacity-80">Room: {room}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat ${
                m.userName === userName ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header text-sm opacity-70 mb-1 text-white">
                {m.userName}
              </div>
              <div
                className={`chat-bubble ${
                  m.userName === userName
                    ? "chat-bubble-primary"
                    : "chat-bubble-secondary"
                }`}
              >
                {m.msg}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl mx-auto flex items-center gap-2 border-t border-base-300 pt-3"
      >
        <TextField
          fullWidth
          label="Type your message..."
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          sx={{
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "white",
              },
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatRoom;
