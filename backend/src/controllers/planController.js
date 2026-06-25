const Plan = require("../models/Plan");

exports.createPlan = async (req, res) => {
  try {
    const { name, price, billingInterval } = req.body;

    const plan = await Plan.create({
      company: req.user.company,
      name,
      price,
      billingInterval,
    });

    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      plan,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getPlans = async (req, res) => {

  try {

    const plans = await Plan.find({
      company: req.user.company,
    });

    res.json({
      success: true,
      count: plans.length,
      plans,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

exports.deletePlan = async (req, res) => {

  try {

    const plan = await Plan.findOneAndDelete({
      _id: req.params.id,
      company: req.user.company,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.json({
      success: true,
      message: "Plan deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};