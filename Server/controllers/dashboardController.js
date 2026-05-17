const Record = require("../models/Record");

// Generate dashboard analytics and workflow statistics
const getDashboardStats = async (req, res) => {
  try {
    // Core workflow statistics
    const totalRecords = await Record.countDocuments();

    const needsReview = await Record.countDocuments({
      status: "Needs Review",
    });

    const autoApproved = await Record.countDocuments({
      status: "Auto Approved",
    });

    // Total unique machines processed
    const machineCount = await Record.distinct("machineNumber");

    // Shift-wise workflow summary
    const shiftSummary = await Record.aggregate([
      {
        $group: {
          _id: "$shift",

          total: {
            $sum: 1,
          },
        },
      },
    ]);

    // Total production quantity summary
    const quantitySummary = await Record.aggregate([
      {
        $group: {
          _id: null,

          totalQuantity: {
            $sum: {
              $convert: {
                input: "$quantityProduced",

                to: "double",

                onError: 0,

                onNull: 0,
              },
            },
          },
        },
      },
    ]);

    // Machine-wise workflow summary
    const machineSummary = await Record.aggregate([
      {
        $group: {
          _id: "$machineNumber",

          totalRecords: {
            $sum: 1,
          },
        },
      },
    ]);

    // Send dashboard response
    res.status(200).json({
      success: true,

      stats: {
        totalRecords,

        needsReview,

        autoApproved,

        totalMachines: machineCount.length,

        shiftSummary,

        totalQuantity: quantitySummary[0]?.totalQuantity || 0,

        machineSummary,
      },
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
  getDashboardStats,
};
