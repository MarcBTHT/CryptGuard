"use client";

import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface Password {
  id: number;
  service: string;
  username: string;
  password: string;
}

export default function PasswordManager() {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [service, setService] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch the list of passwords when the page loads
    axios.get<Password[]>("/api/passwords").then((response: AxiosResponse<Password[]>) => {
      setPasswords(response.data);
    });
  }, []);

  const handleAddPassword = async () => {
    if (editId) {
      // Edit existing password
      await axios.put(`/api/passwords/${editId}`, { service, username, password });
      setEditId(null);
    } else {
      // Add new password
      await axios.post("/api/passwords", { service, username, password });
    }

    // Reset the form
    setService("");
    setUsername("");
    setPassword("");

    // Fetch updated list of passwords
    const response: AxiosResponse<Password[]> = await axios.get("/api/passwords");
    setPasswords(response.data);
  };

  const handleEditPassword = (id: number, service: string, username: string, password: string) => {
    setEditId(id);
    setService(service);
    setUsername(username);
    setPassword(password);
  };

  const handleDeletePassword = async (id: number) => {
    await axios.delete(`/api/passwords/${id}`);
    const response: AxiosResponse<Password[]> = await axios.get("/api/passwords");
    setPasswords(response.data);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Password Manager</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleAddPassword} className="bg-blue-500 text-white p-2">
          {editId ? "Update Password" : "Add Password"}
        </button>
      </div>

      <ul>
        {passwords.map((password: Password) => (
          <li key={password.id} className="mb-4 flex justify-between items-center">
            <div>
              <p><strong>Service:</strong> {password.service}</p>
              <p><strong>Username:</strong> {password.username}</p>
            </div>
            <div>
              <button
                onClick={() => handleEditPassword(password.id, password.service, password.username, password.password)}
                className="bg-yellow-500 text-white p-2 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePassword(password.id)}
                className="bg-red-500 text-white p-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
