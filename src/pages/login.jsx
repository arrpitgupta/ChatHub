import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({ username, password });
      navigate("/chat");
    } catch {
      alert("Login failed");
    }
  };

  const handleRegister = async () => {
    try {
      await register({ username, password });
      alert("Registered! Now login.");
    } catch {
      alert("Register failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Chat App</h1>
        
        <input
          className="w-full p-3 border rounded-lg mb-3 focus:ring focus:ring-blue-300"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-blue-300"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
        <button
          onClick={handleRegister}
          className="w-full mt-3 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}
