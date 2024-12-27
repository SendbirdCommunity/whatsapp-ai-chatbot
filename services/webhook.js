const { forwardMessageToWhatsApp } = require('./whatsapp'); // Import the function to forward messages to WhatsApp
const { checkUserExists, createUser, checkChannelExists, createChannel, sendMessage } = require('./sendbird'); // Import Sendbird service functions
const { encrypt, decrypt } = require('./encryption'); // Import encryption and decryption functions

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN; // Retrieve WhatsApp verify token from environment variables
const AI_CHATBOT_ID = process.env.AI_CHATBOT_ID; // Retrieve AI chatbot ID from environment variables

// WhatsApp Webhook Handlers
async function handleWhatsAppWebhook(req, res) {
    const entries = req.body.entry; // Extract entries from the request body

    for (const entry of entries) {
        for (const change of entry.changes) {
            console.log("Field:", change.field); // Log the field of the change
            const { contacts, messages } = change.value; // Extract contacts and messages from the change value
            try {
                contacts.forEach(contact => console.log("Contact:", contact)); // Log each contact
                for (const message of messages) {
                    if (message.type === 'text') { // Check if the message type is text
                        console.log("FOUND TEXT MESSAGE");

                        const userId = encrypt(message.from); // Encrypt the sender's phone number to use as user ID

                        if (!(await checkChannelExists(AI_CHATBOT_ID, userId))) { // Check if the channel exists
                            if (!(await checkUserExists(userId))) await createUser(userId); // Create user if not exists
                            await createChannel(userId, AI_CHATBOT_ID); // Create channel if not exists
                        }

                        await sendMessage(`iswhatsapp_${AI_CHATBOT_ID}_${userId}`, userId, message.text.body); // Send the message to the channel
                    }
                }
            } catch (e) {
                console.log("non_message_webhook", entry); // Log non-message webhook entries
            }
        }
    }

    res.sendStatus(200); // Respond with status 200 (OK)
}

// Verify WhatsApp Webhook
function verifyWhatsAppWebhook(req, res) {
    const mode = req.query['hub.mode']; // Extract mode from query parameters
    const token = req.query['hub.verify_token']; // Extract verify token from query parameters
    const challenge = req.query['hub.challenge']; // Extract challenge from query parameters

    if (mode && token === VERIFY_TOKEN) { // Verify the token
        res.status(200).send(challenge); // Respond with the challenge if verification is successful
    } else {
        res.sendStatus(403); // Respond with status 403 (Forbidden) if verification fails
    }
}

// Sendbird Webhook Handlers
async function handleSendbirdWebhook(req, res) {
    const event = req.body; // Extract event from the request body

    if (event.category === 'group_channel:message_send' && event.sender.user_id === AI_CHATBOT_ID) { // Check if the event is a message send event from the AI chatbot
        const phoneNumber = decrypt(event.channel.channel_url.split('_')[2]); // Decrypt the phone number from the channel URL
        console.log("Phone Number:", phoneNumber); // Log the phone number
        await forwardMessageToWhatsApp(phoneNumber, event.payload.message); // Forward the message to WhatsApp
    }

    res.sendStatus(200); // Respond with status 200 (OK)
}

module.exports = {
    handleWhatsAppWebhook,
    verifyWhatsAppWebhook,
    handleSendbirdWebhook,
}; // Export the webhook handler functions
