const geminiService = require("../services/geminiService");

const validationService = require("../services/validationService");

const Record = require("../models/Record");

// Upload and process manufacturing document
const uploadDocument = async (req, res) => {
  try {
    // Validate uploaded file
    if (!req.file) {
      return res.status(400).json({
        success: false,

        message: "No file uploaded",
      });
    }

    // Extract records using Gemini AI
    const extractedRecords = await geminiService(req.file.path);

    // Validate extracted records
    const validatedRecords = await validationService(extractedRecords);

    // Store validated records in MongoDB
    await Record.insertMany(
      validatedRecords.map((record) => ({
        ...record,

        uploadedFile: req.file.filename,
      })),
    );

    // Send success response
    res.status(200).json({
      success: true,

      message: "AI extraction completed successfully",

      file: req.file,

      validatedRecords,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

module.exports = {
  uploadDocument,
};
