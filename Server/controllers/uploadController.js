const geminiService =
  require("../services/geminiService");

const validationService =
  require("../services/validationService");

const Record =
  require("../models/Record");

const uploadDocument =
  async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({

          success: false,

          message:
            "No file uploaded",

        });

      }

      // Gemini AI extraction
      const extractedRecords =
        await geminiService(
          req.file.path
        );

      // Validation
      const validatedRecords =
        await validationService(
          extractedRecords
        );

      // Save to MongoDB
      await Record.insertMany(

        validatedRecords.map(
          (record) => ({

            ...record,

            uploadedFile:
              req.file.filename,

          })
        )

      );

      res.status(200).json({

        success: true,

        message:
          "AI extraction completed successfully",

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