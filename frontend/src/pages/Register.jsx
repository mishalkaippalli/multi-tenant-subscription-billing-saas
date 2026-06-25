import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBuilding, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", formData);

    //   alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          MultiTenant SaaS
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Create your company account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="font-medium">Company Name</label>

            <div className="flex items-center border rounded-lg mt-2 px-3">

              <FaBuilding className="text-gray-400" />

              <input
                className="w-full p-3 outline-none"
                type="text"
                name="companyName"
                placeholder="OpenAI"
                onChange={handleChange}
              />

            </div>
          </div>

          <div>
            <label className="font-medium">Name</label>

            <div className="flex items-center border rounded-lg mt-2 px-3">

              <FaUser className="text-gray-400" />

              <input
                className="w-full p-3 outline-none"
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
              />

            </div>
          </div>

          <div>
            <label className="font-medium">Email</label>

            <div className="flex items-center border rounded-lg mt-2 px-3">

              <FaEnvelope className="text-gray-400" />

              <input
                className="w-full p-3 outline-none"
                type="email"
                name="email"
                placeholder="john@example.com"
                onChange={handleChange}
              />

            </div>
          </div>

          <div>
            <label className="font-medium">Password</label>

            <div className="flex items-center border rounded-lg mt-2 px-3">

              <FaLock className="text-gray-400" />

              <input
                className="w-full p-3 outline-none"
                type="password"
                name="password"
                placeholder="********"
                onChange={handleChange}
              />

            </div>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create Company"}
          </button>

        </form>

        <p className="text-center mt-6">

          Already have an account?

          <Link
            className="text-blue-600 font-semibold ml-2"
            to="/login"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;