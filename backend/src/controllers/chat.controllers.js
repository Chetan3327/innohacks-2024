import UserModel from '../models/user.model.js';

const sendChatMessage = async (req, res) => {
    try {
        const { receiverId, message } = req.body;
        const senderId = req.user._id;

        // Find the sender and receiver users
        const sender = await UserModel.findById(senderId);
        const receiver = await UserModel.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ message: 'Sender or receiver not found' });
        }

        // Update sender's chat messages
        sender.chatMessages.push({ sender: receiverId, message });
        await sender.save();

        // Update receiver's chat messages
        receiver.chatMessages.push({ sender: senderId, message });
        await receiver.save();

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending chat message:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getChatMessages = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await UserModel.findById(userId).populate('chatMessages.sender', 'name email');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const chatMessages = user.chatMessages;
        res.status(200).json(chatMessages);
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { sendChatMessage, getChatMessages };
