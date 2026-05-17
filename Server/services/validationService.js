const validationService = async (records) => {
  try {
    const workOrderCount = {};

    // Count duplicate work orders
    records.forEach((record) => {
      const wo = record.workOrderNumber;

      if (wo) {
        workOrderCount[wo] = (workOrderCount[wo] || 0) + 1;
      }
    });

    const validatedRecords = records.map((record) => {
      const issues = [];

      // Serial Number
      if (!record.serialNumber) {
        issues.push({
          field: "serialNumber",

          issue: "Missing serial number",

          severity: "low",
        });
      }

      // Date
      if (!record.date) {
        issues.push({
          field: "date",

          issue: "Missing date",

          severity: "medium",
        });
      }

      // Shift
      if (!record.shift) {
        issues.push({
          field: "shift",

          issue: "Missing shift",

          severity: "low",
        });
      }

      // Invalid Shift Values
      const validShifts = ["I", "II", "III"];

      if (record.shift && !validShifts.includes(record.shift)) {
        issues.push({
          field: "shift",

          issue: "Invalid shift value",

          severity: "medium",
        });
      }

      // Employee Number
      if (!record.employeeNumber) {
        issues.push({
          field: "employeeNumber",

          issue: "Missing employee number",

          severity: "high",
        });
      }

      // Operation Code
      if (!record.operationCode) {
        issues.push({
          field: "operationCode",

          issue: "Missing operation code",

          severity: "medium",
        });
      }

      // Machine Number
      if (!record.machineNumber) {
        issues.push({
          field: "machineNumber",

          issue: "Missing machine number",

          severity: "medium",
        });
      }

      // Invalid Machine Code
      if (
        record.machineNumber &&
        !record.machineNumber.toUpperCase().startsWith("MC-")
      ) {
        issues.push({
          field: "machineNumber",

          issue: "Invalid machine code format",

          severity: "medium",
        });
      }

      // Work Order Number
      if (!record.workOrderNumber) {
        issues.push({
          field: "workOrderNumber",

          issue: "Missing work order number",

          severity: "medium",
        });
      }

      // Duplicate Work Orders
      if (
        record.workOrderNumber &&
        workOrderCount[record.workOrderNumber] > 1
      ) {
        issues.push({
          field: "workOrderNumber",

          issue: "Duplicate work order number",

          severity: "high",
        });
      }

      // Quantity Validation
      const qty = Number(record.quantityProduced);

      if (!record.quantityProduced || isNaN(qty)) {
        issues.push({
          field: "quantityProduced",

          issue: "Invalid quantity",

          severity: "high",
        });
      }

      // Suspicious Quantity
      if (qty > 1000) {
        issues.push({
          field: "quantityProduced",

          issue: "Suspiciously high quantity",

          severity: "medium",
        });
      }

      // Time Validation
      const time = Number(record.timeTakenHours);

      if (!record.timeTakenHours || isNaN(time)) {
        issues.push({
          field: "timeTakenHours",

          issue: "Invalid time value",

          severity: "medium",
        });
      }

      // Confidence Logic
      let confidence = "high";

      if (issues.length >= 3) {
        confidence = "low";
      } else if (issues.length > 0) {
        confidence = "medium";
      }

      return {
        ...record,

        confidence,

        issues,

        status: issues.length > 0 ? "Needs Review" : "Auto Approved",
      };
    });

    return validatedRecords;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

module.exports = validationService;
