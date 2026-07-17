const masterDataModel = require("../../model/admin/masterDataModel");

const getPublicMasterData = async (req, res) => {
  try {
    const data = await masterDataModel.find({ isActive: true }).select("name type -_id").lean();
    
    // Group by type
    const grouped = {
      castes: [],
      denominations: []
    };
    
    data.forEach(item => {
      if (item.type === 'caste') grouped.castes.push(item.name);
      else if (item.type === 'denomination') grouped.denominations.push(item.name);
    });

    res.status(200).json({ success: true, data: grouped });
  } catch (err) {
    console.error("Error fetching public master data:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getPublicMasterData,
};
