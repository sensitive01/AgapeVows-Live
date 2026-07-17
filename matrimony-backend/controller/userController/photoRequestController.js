const PhotoRequest = require("../../model/user/photoRequestModel");
const User = require("../../model/user/userModel");

// Create a new photo request
exports.requestPhoto = async (req, res) => {
  try {
    const { requesterId, receiverId } = req.body;

    if (!requesterId || !receiverId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check if request already exists
    const existingRequest = await PhotoRequest.findOne({ requesterId, receiverId });
    if (existingRequest) {
      return res.status(400).json({ success: false, message: "Photo request already sent" });
    }

    const newRequest = new PhotoRequest({
      requesterId,
      receiverId,
      status: "pending"
    });

    await newRequest.save();

    // Increment unread photo requests count for the receiver
    await User.findByIdAndUpdate(receiverId, { $inc: { unreadPhotoRequestsCount: 1 } });

    return res.status(201).json({ success: true, message: "Photo requested successfully", data: newRequest });
  } catch (error) {
    console.error("Error in requestPhoto:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all photo requests for a user
exports.getPhotoRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch received requests
    const receivedRequests = await PhotoRequest.find({ receiverId: userId })
      .populate("requesterId", "agwid userName age caste location profileImage dateOfBirth religion height weight education occupation motherTongue")
      .sort({ createdAt: -1 });

    // Fetch sent requests
    const sentRequests = await PhotoRequest.find({ requesterId: userId })
      .populate("receiverId", "agwid userName age caste location profileImage dateOfBirth religion height weight education occupation motherTongue")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: {
        received: receivedRequests,
        sent: sentRequests
      }
    });
  } catch (error) {
    console.error("Error in getPhotoRequests:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Respond to a photo request (accept/decline)
exports.respondToPhotoRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body; // 'accepted' or 'declined'

    if (!["accepted", "declined"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const request = await PhotoRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    return res.status(200).json({ success: true, message: `Request ${status} successfully`, data: request });
  } catch (error) {
    console.error("Error in respondToPhotoRequest:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
