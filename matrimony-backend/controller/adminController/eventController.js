const Event = require("../../model/admin/eventModel");
const cloudinary = require("../../utils/cloudinaryConfig");
const fs = require("fs");

exports.getAllEvents = async (req, res) => {
    try {
        // Sort: Pinned events first, then by Creation Date descending
        const events = await Event.find().sort({ isPinned: -1, createdAt: -1 });
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.addNewEvent = async (req, res) => {
    try {
        const {
            name,
            date,
            location,
            churchName,
            state,
            contact,
            email,
            mapLink,
            description,
            details,
            status,
            isPinned
        } = req.body;

        let imageUrl = "";

        // Upload image to Cloudinary if file exists
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "events",
            });
            imageUrl = result.secure_url;
        }

        const newEvent = new Event({
            name,
            date,
            location,
            state,
            contact,
            email,
            mapLink,
            description,
            details,
            status,
            churchName,
            // Convert string "true"/"false" to boolean
            isPinned: isPinned === 'true',
            image: imageUrl,
        });

        await newEvent.save();
        res.status(201).json({ success: true, data: newEvent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.editEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            date,
            location,
            state,
            contact,
            email,
            mapLink,
            description,
            details,
            status,
            isPinned
        } = req.body;

        let updateData = {
            name,
            date,
            location,
            state,
            contact,
            email,
            mapLink,
            description,
            details,
            status,
            isPinned: isPinned === 'true'
        };

        // If a new file is uploaded, update the image
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "events",
            });
            updateData.image = result.secure_url;
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ success: true, data: updatedEvent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};