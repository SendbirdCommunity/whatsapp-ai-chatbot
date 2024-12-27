const axiosInstance = require('../config/axiosInstance'); // Import the configured axios instance
const { encrypt } = require('./encryption'); // Import the encrypt function from the encryption module

// Check if a User Exists
async function checkUserExists(userId) {
    try {
        const response = await axiosInstance.get(`/users/${userId}`); // Make a GET request to check if the user exists
        return response.status === 200; // Return true if the user exists (status 200)
    } catch {
        return false; // Return false if the user does not exist or an error occurs
    }
}

// Create a New User
async function createUser(userId) {
    await axiosInstance.post("/users", { user_id: userId, nickname: "User", profile_url: "" }); // Make a POST request to create a new user
}

// Check if a Channel Exists
async function checkChannelExists(aiChatbotId, userId) {
    const channelUrl = `iswhatsapp_${aiChatbotId}_${userId}`; // Construct the channel URL
    try {
        const response = await axiosInstance.get(`/group_channels/${channelUrl}`); // Make a GET request to check if the channel exists
        return response.status === 200; // Return true if the channel exists (status 200)
    } catch {
        return false; // Return false if the channel does not exist or an error occurs
    }
}

// Create a New Channel
async function createChannel(userId, aiChatbotId) {
    const channelUrl = `iswhatsapp_${aiChatbotId}_${userId}`; // Construct the channel URL
    await axiosInstance.post("/group_channels", {
        user_ids: [userId, aiChatbotId], // Include the user and AI chatbot IDs
        name: "WhatsApp", // Set the channel name
        channel_url: channelUrl, // Set the channel URL
    }); // Make a POST request to create a new channel
}

// Send a Message
async function sendMessage(channelUrl, userId, message) {
    await axiosInstance.post(`/group_channels/${channelUrl}/messages`, {
        user_id: userId, // Include the user ID
        message, // Include the message content
    }); // Make a POST request to send a message
}

module.exports = {
    checkUserExists,
    createUser,
    checkChannelExists,
    createChannel,
    sendMessage,
}; // Export the functions for use in other modules
