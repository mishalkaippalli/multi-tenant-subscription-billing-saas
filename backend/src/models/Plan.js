const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },

    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
      minlength: [2, "Plan name must be at least 2 characters"],
      maxlength: [100, "Plan name cannot exceed 100 characters"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    billingInterval: {
      type: String,
      enum: ["monthly"],
      default: "monthly",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", planSchema);