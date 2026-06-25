import { useEffect, useState } from "react";
import api from "../services/api";

function SubscriptionsSection() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    planId: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchUsers();
    fetchPlans();
    fetchSubscriptions();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data.users);;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await api.get("/plans");
      setPlans(response.data.plans);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await api.get("/subscriptions");
      setSubscriptions(response.data.subscriptions);
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
      await api.post("/subscriptions", formData);

      fetchSubscriptions();

      setFormData({
        userId: "",
        planId: "",
        startDate: "",
        endDate: "",
      });

    //   alert("Subscription Assigned Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-6">
        Subscriptions
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-5 gap-4 mb-8"
      >
        <select
          className="border rounded-lg p-3"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        >
          <option value="">Select User</option>

          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded-lg p-3"
          name="planId"
          value={formData.planId}
          onChange={handleChange}
          required
        >
          <option value="">Select Plan</option>

          {plans.map((plan) => (
            <option key={plan._id} value={plan._id}>
              {plan.name}
            </option>
          ))}
        </select>

        <input
          className="border rounded-lg p-3"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <input
          className="border rounded-lg p-3"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <button className="bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Assign
        </button>
      </form>

      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="text-left py-3 px-2">User</th>
            <th className="text-left py-3 px-2">Plan</th>
            <th className="text-left py-3 px-2">Status</th>
            <th className="text-left py-3 px-2">Start</th>
            <th className="text-left py-3 px-2">End</th>
          </tr>
        </thead>

        <tbody>
          {subscriptions.map((subscription) => (
            <tr
              key={subscription._id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-3 px-2">
                {subscription.user.name}
              </td>

              <td className="py-3 px-2">
                {subscription.plan.name}
              </td>

              <td className="py-3 px-2">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {subscription.status}
                </span>
              </td>

              <td className="py-3 px-2">
                {new Date(subscription.startDate).toLocaleDateString()}
              </td>

              <td className="py-3 px-2">
                {new Date(subscription.endDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubscriptionsSection;