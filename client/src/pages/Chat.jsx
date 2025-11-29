import React from 'react'

const Chat = () => {
  return (
    <div className="min-h-screen border border-red-600 flex justify-center items-center text-center ">
      <div className="chat-box flex-col h-[80vh] w-1/4 border border-black   justify-center items-center p-3 bg-gray-00  ">
        <div className="flex justify-start mb-2">
          <div className="bg-gray-300 text-black px-3 py-2 rounded-lg max-w-[70%]">
            User Chat
          </div>
        </div>{" "}
        <div className="flex justify-end mb-2">
          <div className="bg-blue-500 text-black px-3 py-2 rounded-lg max-w-[70%]">
            My Chat
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default Chat
