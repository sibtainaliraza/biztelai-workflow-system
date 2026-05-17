const express = require("express");

const router = express.Router();

const { getDashboardStats } = require("../controllers/dashboardController");

// Dashboard analytics route
router.get("/", getDashboardStats);

module.exports = router;
