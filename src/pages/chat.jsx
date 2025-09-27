import { useState, useEffect } from "react";
import socket from "../soket";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { sender: "User", text: message });
      setMessage("");
    }
  };
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <ul>
          <li className="py-2 px-3 hover:bg-gray-200 rounded">User 1</li>
          <li className="py-2 px-3 hover:bg-gray-200 rounded">User 2</li>
        </ul>
        <button className="py-2 px-3 fixed-bottom" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Chat Box */}
      <div className="flex flex-col flex-1">
        <div className="bg-blue-500 text-white px-4 py-3 font-bold">
          Global Chat
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {chat.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.sender === "User" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  m.sender === "User"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <p className="text-sm">
                  <span className="font-semibold">{m.sender}:</span> {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 flex border-t bg-white">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="ml-3 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
