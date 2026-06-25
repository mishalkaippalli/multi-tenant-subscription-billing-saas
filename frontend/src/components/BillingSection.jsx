import { useEffect, useState } from "react";
import api from "../services/api";

function BillingSection() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBillingLogs();
  }, []);

  const fetchBillingLogs = async () => {
    try {
      const response = await api.get("/billing/logs");
      setLogs(response.data.logs);
    } catch (error) {
      console.log(error);
    }
  };

  const runBilling = async () => {
    try {
      setLoading(true);

      const response = await api.post("/billing/run-cycle");

      alert(response.data.message);

      fetchBillingLogs();
    } catch (error) {
      alert(error.response?.data?.message || "Billing Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-semibold">
          Billing
        </h2>

        <button
          onClick={runBilling}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          {loading ? "Running..." : "Run Billing"}
        </button>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b bg-gray-100">

            <th className="text-left py-3 px-2">
              User
            </th>

            <th className="text-left py-3 px-2">
              Plan
            </th>

            <th className="text-left py-3 px-2">
              Amount
            </th>

            <th className="text-left py-3 px-2">
              Status
            </th>

            <th className="text-left py-3 px-2">
              Billing Date
            </th>

          </tr>

        </thead>

        <tbody>

          {logs.map((log) => (

            <tr
              key={log._id}
              className="border-b hover:bg-gray-50"
            >

              <td className="py-3 px-2">
                {log.user.name}
              </td>

              <td className="py-3 px-2">
                {log.plan.name}
              </td>

              <td className="py-3 px-2">
                ₹{log.amount}
              </td>

              <td className="py-3 px-2">

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                  {log.status}

                </span>

              </td>

              <td className="py-3 px-2">

                {new Date(log.billingDate).toLocaleDateString()}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default BillingSection;