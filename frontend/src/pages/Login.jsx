import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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

      await api.post("/auth/login", formData);

      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Login to your company dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

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
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6">

          Don't have an account?

          <Link
            className="text-blue-600 font-semibold ml-2"
            to="/"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;