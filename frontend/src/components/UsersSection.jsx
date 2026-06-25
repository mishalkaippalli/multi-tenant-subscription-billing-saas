import { useEffect, useState } from "react";
import api from "../services/api";

function UsersSection() {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", formData);

      fetchUsers();

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      alert("User created successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        Users
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-4 gap-4 mb-8"
      >
        <input
          className="border rounded-lg p-3"
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className="border rounded-lg p-3"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="border rounded-lg p-3"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          className="bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add User
        </button>
      </form>

      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="text-left py-3 px-2">Name</th>
            <th className="text-left py-3 px-2">Email</th>
            <th className="text-left py-3 px-2">Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-3 px-2">{user.name}</td>
              <td className="py-3 px-2">{user.email}</td>
              <td className="py-3 px-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersSection;