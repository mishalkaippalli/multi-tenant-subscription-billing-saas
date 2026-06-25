const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // React Vite
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running..."
  });
});

module.exports = app;