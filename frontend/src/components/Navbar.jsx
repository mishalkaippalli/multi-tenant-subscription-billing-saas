import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Navbar() {

    const navigate = useNavigate();

    const handleLogout = async () => {
  try {

    await api.post("/auth/logout");

    navigate("/login");

  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="bg-white shadow flex justify-between items-center px-8 py-5">

      <div>

        <h2 className="text-2xl font-semibold">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Multi-Tenant Subscription Billing
        </p>

      </div>

      <button
    onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
      > 
    Logout
     </button>

    </div>
  );
}

export default Navbar;