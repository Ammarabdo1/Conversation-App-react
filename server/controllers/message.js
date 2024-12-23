import Message from "../model/message.js";

export const getMessage = async (req, res) => {
  try {
    const userId = req.userId;
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error.message);

    // Handle any errors
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages." });
  }
};
