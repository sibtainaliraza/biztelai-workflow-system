require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB =
  require("./config/db");

const uploadRoutes =
  require("./routes/uploadRoutes");

const recordRoutes =
  require("./routes/recordRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(

  cors({

    origin:
      "https://biztelai-workflow-system.netlify.app",

    credentials: true,

  })

);
app.use(express.json());

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/uploads",express.static("uploads"));

// Test Route
app.get("/", (req, res) => {
  res.send("BiztelAI Backend Running");
});

// Port
const PORT =
  process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});