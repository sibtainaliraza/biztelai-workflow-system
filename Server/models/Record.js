const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  field: String,

  issue: String,

  severity: String,
});

const recordSchema = new mongoose.Schema(
  {
    serialNumber: String,

    date: String,

    shift: String,

    employeeNumber: String,

    operationCode: String,

    machineNumber: String,

    workOrderNumber: String,

    quantityProduced: String,

    timeTakenHours: String,

    confidence: String,

    status: String,

    issues: [issueSchema],

    uploadedFile: String,
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Record", recordSchema);
