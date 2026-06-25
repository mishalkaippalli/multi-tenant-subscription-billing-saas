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

      // 1. Check if subscription has expired
      if (subscription.endDate < today) {
        subscription.status = "Expired";
        await subscription.save();

        expired++;
        continue;
      }

   

       // 2. Has the subscription started?
      if (subscription.startDate > today) {
        skipped++;
        continue;
       }
        let shouldBill = false;

      // 3. First billing
      if (!subscription.lastBilledDate) {
        shouldBill = true;
      } else {

        // 4. Calculate next billing date
        const nextBillingDate = new Date(subscription.lastBilledDate);

        nextBillingDate.setMonth(
          nextBillingDate.getMonth() + 1
        );

        // 5. Check whether next billing cycle has arrived
        if (today >= nextBillingDate) {
          shouldBill = true;
        }
      }

      // 6. Skip if billing cycle has not arrived
      if (!shouldBill) {
        skipped++;
        continue;
      }

      // 7. Create billing log
      await BillingLog.create({
        company: subscription.company,
        user: subscription.user,
        plan: subscription.plan._id,
        amount: subscription.plan.price,
        status: "Success",
      });

      // 7. Update last billed date
      subscription.lastBilledDate = today;
      await subscription.save();

      billed++;
    }

    res.status(200).json({
      success: true,
      message: "Billing cycle completed successfully",
      summary: {
        billed,
        skipped,
        expired,
      },
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