require('dotenv').config(); // Load environment variables from .env file

const express = require("express"); // Import the Express framework
const webhook = require('./services/webhook'); // Import the webhook handlers

const app = express(); // Create an Express application

// Middleware
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

// Routes
app.post("/messages", webhook.handleWhatsAppWebhook); // Route to handle incoming WhatsApp webhook events
app.get("/messages", webhook.verifyWhatsAppWebhook); // Route to verify WhatsApp webhook
app.post("/webhook/sendbird", webhook.handleSendbirdWebhook); // Route to handle incoming Sendbird webhook events

// Start the Server
app.listen(3000, () => console.log("Server started on port 3000")); // Start the server on port 3000 and log a message
