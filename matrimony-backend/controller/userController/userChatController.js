const userModel = require("../../model/user/userModel");
const chatModel = require("../../model/user/chatModel");
const moment = require("moment");

const getAllChatDoneByTheUsers = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    console.log("senderId:", senderId, "receiverId:", receiverId);

    let chat = await chatModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If chat doesn't exist, create a new room with participants
    if (!chat) {
      chat = new chatModel({
        participants: [senderId, receiverId],
        messages: [],
      });

      await chat.save();

      return res.status(200).json({
        success: true,
        message: "Chat room created. No messages yet.",
        messages: [],
      });
    }

    // If chat exists, return messages sorted by timestamp
    const sortedMessages = chat.messages.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    return res.status(200).json({
      success: true,
      messages: sortedMessages,
    });
  } catch (err) {
    console.error("Error in fetching chat history", err);
    return res.status(500).json({
      success: false,
      message: "Failed to get chat history.",
      error: err.message,
    });
  }
};

const saveMyChats = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const { text } = req.body.message;

    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "Message text is required." });
    }

    // Step 1: Check if a chat already exists between both users
    let chat = await chatModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    const newMessage = {
      senderId: senderId,
      message: text,
      timestamp: new Date(),
    };

    if (chat) {
      // Step 2: If chat exists, push the message
      chat.messages.push(newMessage);
      await chat.save();
    } else {
      // Step 3: If no chat exists, create a new one
      chat = new chatModel({
        participants: [senderId, receiverId],
        messages: [newMessage],
      });
      await chat.save();
    }

    return res.status(200).json({
      success: true,
      message: "Message saved successfully.",
      chat,
    });
  } catch (err) {
    console.error("Error in saving the chats", err);
    return res.status(500).json({
      success: false,
      message: "Failed to save the message.",
      error: err.message,
    });
  }
};

const getMyChatList = async (req, res) => {
  try {
    const { senderId } = req.params;

    const chats = await chatModel
      .find({
        participants: senderId,
      })
      .sort({ updatedAt: -1 });

    const chatList = (await Promise.all(
      chats.map(async (chat) => {
        const otherParticipantId = chat.participants.find(
          (id) => id.toString() !== senderId
        );

        // Check if other participant is blocked or if they have blocked the current user
        const currentUser = await userModel.findById(senderId, { blockedUsers: 1 });
        const otherUser = await userModel.findById(otherParticipantId, {
          userName: 1,
          profileImage: 1,
          blockedUsers: 1,
          paymentDetails: 1,
          isAnySubscriptionTaken: 1,
        });

        // Skip if either user has blocked the other
        const isSelfBlocked = currentUser?.blockedUsers?.some(
          (b) => b.user.toString() === otherParticipantId.toString()
        );
        const isOtherBlocked = otherUser?.blockedUsers?.some(
          (b) => b.user.toString() === senderId.toString()
        );

        if (isSelfBlocked || isOtherBlocked) {
          return null;
        }

        const lastMessage =
          chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1]
            : null;

        return {
          chatId: chat._id,
          participant: {
            _id: otherUser?._id || otherParticipantId,
            name: otherUser?.userName || "Unknown",
            profileImage: otherUser?.profileImage || null,
            paymentDetails: otherUser?.paymentDetails || [],
            isAnySubscriptionTaken: otherUser?.isAnySubscriptionTaken || false,
          },
          lastMessage: lastMessage
            ? {
                senderId: lastMessage.senderId,
                message: lastMessage.message,
                timestamp: lastMessage.timestamp,
                isMyMessage: lastMessage.senderId.toString() === senderId,
              }
            : null,
        };
      })
    )).filter((chat) => chat !== null);

    return res.status(200).json({
      success: true,
      chatList,
    });
  } catch (err) {
    console.error("Error in getMyChatList:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch chat list.",
      error: err.message,
    });
  }
};

const getMyIndividualChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chatData = await chatModel.findOne({ _id: chatId }, { messages: 1 });

    if (!chatData) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Optional: If you want to populate sender info for each message
    const enrichedMessages = await Promise.all(
      chatData.messages.map(async (msg) => {
        const sender = await userModel.findById(msg.senderId, {
          userName: 1,
          profileImage: 1,
        });

        return {
          _id: msg._id,
          senderId: msg.senderId,
          senderName: sender?.userName || "Unknown",
          profileImage: sender?.profileImage || null,
          message: msg.message,
          timestamp: msg.timestamp,
          formattedTime: moment(msg.timestamp).fromNow(), // e.g., "2 hours ago"
        };
      })
    );

    return res.status(200).json({
      success: true,
      messages: enrichedMessages,
    });
  } catch (err) {
    console.error("Error fetching chat:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const clearChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await chatModel.findByIdAndUpdate(
      chatId,
      {
        $set: { messages: [] },
      },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat history cleared successfully",
    });
  } catch (err) {
    console.error("Error clearing chat:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllChatDoneByTheUsers,
  saveMyChats,
  getMyChatList,
  getMyIndividualChat,
  clearChat,
};
