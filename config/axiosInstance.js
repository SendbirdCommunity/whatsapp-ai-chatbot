require("dotenv").config(); // Load environment variables from .env file

const axios = require("axios"); // Import axios for making HTTP requests

// Retrieve Sendbird API token and app ID from environment variables
const SENDBIRD_API_TOKEN = process.env.SENDBIRD_API_TOKEN;
const SENDBIRD_APP_ID = process.env.SENDBIRD_APP_ID;

// Create and export an axios instance configured for Sendbird API
module.exports = axios.create({
    baseURL: `https://api-${SENDBIRD_APP_ID}.sendbird.com/v3`, // Base URL for Sendbird API
    headers: {
        "Content-Type": "application/json", // Set content type to JSON
        "Api-Token": SENDBIRD_API_TOKEN, // Set API token for authentication
    },
});
