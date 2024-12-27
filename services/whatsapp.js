const axios = require('axios'); // Import axios for making HTTP requests

const WHATSAPP_AUTH_TOKEN = process.env.WHATSAPP_AUTH_TOKEN; // Retrieve WhatsApp authentication token from environment variables
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID; // Retrieve WhatsApp phone ID from environment variables

// Forward a Message to WhatsApp
async function forwardMessageToWhatsApp(phoneNumber, messageText) {
    try {
        await axios.post(
            `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_ID}/messages`, // WhatsApp API endpoint for sending messages
            {
                messaging_product: "whatsapp", // Specify the messaging product as WhatsApp
                to: phoneNumber, // Recipient's phone number
                type: "text", // Message type
                text: { body: messageText }, // Message content
            },
            {
                headers: {
                    "Authorization": `Bearer ${WHATSAPP_AUTH_TOKEN}`, // Set the authorization header with the WhatsApp auth token
                    "Content-Type": "application/json", // Set the content type to JSON
                },
            }
        );
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
}

module.exports = { forwardMessageToWhatsApp }; // Export the forwardMessageToWhatsApp function
