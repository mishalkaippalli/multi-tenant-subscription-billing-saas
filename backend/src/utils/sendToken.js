const generateToken = require("./generateToken");

const sendToken = (user, company, statusCode, res, message) => {
  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    success: true,
    message,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: {
        id: company._id,
        name: company.name,
      },
    },
  });
};

module.exports = sendToken;