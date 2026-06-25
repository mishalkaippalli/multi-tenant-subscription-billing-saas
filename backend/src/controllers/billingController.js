const Subscription = require("../models/Subscription");
const BillingLog = require("../models/BillingLog");

exports.runBillingCycle = async (req, res) => {

  try {

    const subscriptions = await Subscription.find({
      company: req.user.company,
      status: "Active",
    }).populate("plan");

    let billed = 0;
    let skipped = 0;
    let expired = 0;

    const today = new Date();

    for (const subscription of subscriptions) {

      if (subscription.endDate < today) {

        subscription.status = "Expired";
        await subscription.save();

        expired++;

        continue;
      }

      if (
        subscription.lastBilledDate &&
        subscription.lastBilledDate.toDateString() === today.toDateString()
      ) {
        skipped++;
        continue;
      }

      await BillingLog.create({
        company: subscription.company,
        user: subscription.user,
        plan: subscription.plan._id,
        amount: subscription.plan.price,
        status: "Success",
      });

      subscription.lastBilledDate = today;

      await subscription.save();

      billed++;

    }

    res.json({
      success: true,
      billed,
      skipped,
      expired,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

exports.getBillingLogs = async (req, res) => {

  try {

    const logs = await BillingLog.find({
      company: req.user.company,
    })
      .populate("user", "name email")
      .populate("plan", "name price");

    res.json({
      success: true,
      logs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};