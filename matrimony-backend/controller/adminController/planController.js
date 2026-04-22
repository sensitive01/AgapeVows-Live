const planModel = require("../../model/admin/planModel");

const addNewPlanData = async (req, res) => {
  try {
    const { planData } = req.body;
    console.log("Plan Data", planData);

    const requiredFields = [
      "name",
      "price",
      "priceType",
      "duration",
      "durationType",
      "maxProfiles",
      "profilesType",
      "dailyLimit",
      "canViewProfiles",
      "viewContactDetails",
      "sendInterestRequest",
      "startChat",
      "dedicatedManager",
      "status",
    ];

    const missing = requiredFields.filter(
      (field) => planData[field] == null || planData[field] === ""
    );

    if (missing.length) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missing.join(", ")}`,
      });
    }

    const normalizeValue = (val) => {
      return isNaN(val) ? val : Number(val);
    };

    const docData = {
      name: planData.name,
      price: Number(planData.price),
      priceType: planData.priceType,
      duration: Number(planData.duration),
      durationType: planData.durationType,
      maxProfiles: normalizeValue(planData.maxProfiles),
      profilesType: planData.profilesType,
      dailyLimit: normalizeValue(planData.dailyLimit),
      canViewProfiles: planData.canViewProfiles,
      viewContactDetails: planData.viewContactDetails,
      sendInterestRequest: planData.sendInterestRequest,
      startChat: planData.startChat,
      dedicatedManager: planData.dedicatedManager,
      status: planData.status,
    };

    const newPlan = new planModel(docData);
    const savedPlan = await newPlan.save();

    return res.status(201).json({ success: true, data: savedPlan });
  } catch (err) {
    console.error("Error in saving the plan", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const editPlanData = async (req, res) => {
  try {
    const { planId } = req.params;
    const { planData } = req.body;

    // Optional: Basic field validation
    if (!planData || !planId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input data" });
    }

    // Ensure numeric fields are numbers
    const updatedData = {
      ...planData,
      price: Number(planData.price),
      maxProfiles: Number(planData.maxProfiles),
    };

    const updatedPlan = await planModel.findByIdAndUpdate(planId, updatedData, {
      new: true,
    });

    if (!updatedPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: updatedPlan,
    });
  } catch (err) {
    console.error("Error updating plan:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllPlanData = async (req, res) => {
  try {
    const plans = await planModel.find();

    res.status(200).json({
      success: true,
      message: "All plans fetched successfully",
      data: plans,
    });
  } catch (err) {
    console.error("Error fetching plans:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const editPlanStatus = async (req, res) => {
  try {
    const { planId } = req.params;
    const { planStatus } = req.body;
    console.log("planStatus", planStatus, planId);

    if (!["Active", "Inactive"].includes(planStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Allowed values: Active, Inactive",
      });
    }

    const updatedPlan = await planModel.findByIdAndUpdate(
      planId,
      { status: planStatus },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Plan status updated to ${planStatus}`,
      data: updatedPlan,
    });
  } catch (err) {
    console.error("Error updating plan status:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports = {
  editPlanStatus,
  getAllPlanData,
  editPlanData,
  addNewPlanData,
};
