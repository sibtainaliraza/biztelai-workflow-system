const Record = require("../models/Record");

const getRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,

      records,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

const updateRecord = async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,

      updatedRecord,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

module.exports = {
  getRecords,

  updateRecord,
};
