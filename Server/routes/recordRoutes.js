const express = require("express");

const router = express.Router();

const {
  getRecords,

  updateRecord,
} = require("../controllers/recordController");

// Workflow records routes
router.get("/", getRecords);

router.put("/:id", updateRecord);

module.exports = router;
