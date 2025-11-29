import React, { useState } from "react";

const ChatScreen = ({messages, userName, socket, room}) => {
    
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
     const socketId = socket.id;
     socket.emit("message", { message, room, userName });
     setMessage("");
    
   };

  return (
    <div className="flex flex-col h-screen bg-base-200 p-4">
      {/* Chat Container */}
      <div className="flex flex-col flex-1 bg-base-100 shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-primary text-primary-content text-lg font-semibold flex justify-between items-center">
          <span>💬 Chat Room</span>
          <span className="text-sm opacity-80">Room: home</span>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat ${
                m.userName === userName ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header text-sm opacity-70 mb-1">
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

        {/* Input Area */}
        <div className="p-4 border-t border-base-300 flex gap-2">
          <form onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type your message..."
              className="input input-bordered w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
