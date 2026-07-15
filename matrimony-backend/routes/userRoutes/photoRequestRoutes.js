const express = require("express");
const router = express.Router();
const photoRequestController = require("../../controller/userController/photoRequestController");

// Request a photo
router.post("/request-photo", photoRequestController.requestPhoto);

// Get all requests for a user
router.get("/photo-requests/:userId", photoRequestController.getPhotoRequests);

// Respond to a photo request
router.put("/respond-photo-request/:requestId", photoRequestController.respondToPhotoRequest);

module.exports = router;
