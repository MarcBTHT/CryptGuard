"use client";

import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import { Input } from "@nextui-org/input";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";

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
      <h2 className="text-2xl font-bold mb-6">Password Manager</h2>
      <Card className="w-full">
        <CardBody className="mt-4" >
          <Input
            fullWidth
            label="Service"
            placeholder="Amazon"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mb-4"
          />
          <Input
            fullWidth
            label="Username"
            placeholder="Michelle24"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4"
          />
          <Input
            fullWidth
            type="password"
            label="Password"
            placeholder="azerty123#"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleAddPassword} className="mb-4">
            {editId ? "Update Password" : "Add Password"}
          </Button>
        </CardBody>
      </Card>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Accounts list</h2>
        {passwords.map((password: Password) => (
          <Card key={password.id} className="mb-4">
            <CardBody className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <p>
                  <strong>Service:</strong> {password.service}
                </p>
                <p>
                  <strong>Username:</strong> {password.username}
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:text-right">
                <Button
                  onClick={() =>
                    handleEditPassword(
                      password.id,
                      password.service,
                      password.username,
                      password.password
                    )
                  }
                  color="warning"
                  size="md"
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeletePassword(password.id)}
                  color="danger"
                  size="md"
                >
                  Delete
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}