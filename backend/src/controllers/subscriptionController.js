const User = require("../models/User");
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");

exports.createSubscription = async (req, res) => {
  try {
    const { userId, planId, startDate, endDate } = req.body;

    const user = await User.findOne({
      _id: userId,
      company: req.user.company,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const plan = await Plan.findOne({
      _id: planId,
      company: req.user.company,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    const existingSubscription = await Subscription.findOne({
      user: userId,
      company: req.user.company,
      status: "Active",
    });

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: "User already has an active subscription",
      });
    }

    const subscription = await Subscription.create({
      company: req.user.company,
      user: userId,
      plan: planId,
      startDate,
      endDate,
      status: "Active",
    });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      subscription,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getSubscriptions = async (req, res) => {

  try {

    const subscriptions = await Subscription.find({
      company: req.user.company,
    })
      .populate("user", "name email")
      .populate("plan", "name price");

    res.json({
      success: true,
      subscriptions,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};