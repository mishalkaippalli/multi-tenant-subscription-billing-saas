const Company = require("../models/Company");
const User = require("../models/User");

const sendToken = require("../utils/sendToken");


exports.register = async (req, res) => {
  try {
    const { companyName, name, email, password } = req.body;

    // Basic validation
    if (!companyName || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create company
    const company = await Company.create({
      name: companyName,
    });

    // Create admin user
    const admin = await User.create({
      company: company._id,
      name,
      email,
      password,
      role: "admin",
    });

 return sendToken(
  admin,
  company,
  201,
  res,
  "Company registered successfully"
 );

res.status(201).json({
  success: true,
  message: "Company registered successfully",
  user: {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    company: {
      id: company._id,
      name: company.name,
    },
  },
});

  } catch (error) {

    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email })
      .select("+password")
      .populate("company");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

     return sendToken(
      user,
      user.company,
      200,
      res,
     "Login successful"
   );

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};