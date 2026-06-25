import {
  FaChartPie,
  FaBox,
  FaUsers,
  FaCreditCard,
  FaFileInvoiceDollar,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h1 className="text-2xl font-bold text-blue-400 mb-10">
        Billing SaaS
      </h1>

      <nav className="space-y-6">

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaChartPie />
          Dashboard
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaBox />
          Plans
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaUsers />
          Users
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaCreditCard />
          Subscriptions
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaFileInvoiceDollar />
          Billing
        </div>

      </nav>

    </aside>
  );
}

export default Sidebar;