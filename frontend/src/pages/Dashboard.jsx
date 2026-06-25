import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import PlansSection from "../components/PlansSections";
import UsersSection from "../components/UsersSection";
import SubscriptionsSection from "../components/SubscriptionsSection";
import BillingSection from "../components/BillingSection";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    expiredSubscriptions: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");

      setDashboard(response.data.dashboard);
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">


      {/* Main Content */}

      <div className="flex-1">

        {/* Top Navbar */}

        <Navbar />

        {/* Page Content */}

        <div className="p-8">

          {/* Dashboard Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <StatsCard
              title="Total Users"
              value={dashboard.totalUsers}
            />

            <StatsCard
              title="Active Subscriptions"
              value={dashboard.activeSubscriptions}
            />

            <StatsCard
              title="Total Revenue"
              value={`₹${dashboard.totalRevenue}`}
            />

            <StatsCard
              title="Expired Subscriptions"
              value={dashboard.expiredSubscriptions}
            />

          </div>

          {/* Plans Section */}

          <PlansSection />
          <UsersSection />
           <SubscriptionsSection />
           <BillingSection />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;