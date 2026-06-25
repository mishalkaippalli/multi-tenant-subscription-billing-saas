const User = require("../models/User");
const Subscription = require("../models/Subscription");
const BillingLog = require("../models/BillingLog");

exports.getDashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments({
      company: req.user.company,
    });

    const activeSubscriptions = await Subscription.countDocuments({
      company: req.user.company,
      status: "Active",
    });

    const expiredSubscriptions = await Subscription.countDocuments({
      company: req.user.company,
      status: "Expired",
    });

    const revenue = await BillingLog.aggregate([
      {
        $match: {
          company: req.user.company,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const planDistribution = await Subscription.aggregate([
      {
        $match: {
          company: req.user.company,
        },
      },
      {
        $group: {
          _id: "$plan",
          totalSubscriptions: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json({
      success: true,
      dashboard: {
        totalUsers,
        activeSubscriptions,
        expiredSubscriptions,
        totalRevenue:
          revenue.length > 0 ? revenue[0].totalRevenue : 0,
        planDistribution,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};