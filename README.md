

# Proxy Server between WhatsApp and Sendbird's Chatbots

## Overview

This project is a proxy server that facilitates communication between WhatsApp and Sendbird's chatbots. It allows messages to be forwarded between WhatsApp users and an AI chatbot in Sendbird.

## Features

- Handles incoming WhatsApp messages and forwards them to Sendbird.
- Processes messages from Sendbird and sends them to WhatsApp users.
- Verifies WhatsApp webhooks.
- Uses environment variables for configuration.

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   
   SENDBIRD_API_TOKEN=<your-sendbird-api-token-from-sendbird-dashboard-settings>
   SENDBIRD_APP_ID=<your-sendbird-app-id-from-sendbird-dashboard-settings>
   VERIFY_TOKEN=<your-whatsapp-webhook-verify-token>
   WHATSAPP_AUTH_TOKEN=<your-whatsapp-auth-token>
   WHATSAPP_PHONE_ID=<your-whatsapp-phone-id>
   ENCRYPTION_KEY=<genetate-a-random-encryption-key-see-encrytion.js>
   IV=<genetate-a-random-IV-key-see-encrytion.js>
   AI_CHATBOT_ID=<your-ai-chatbot-user-id-from-sendbird-dashboard-bot-studio>
   
   ```

## Usage

1. Start the server:
   ```sh
   npm start
   ```

2. The server will start on port 3000.

## API Endpoints

- **POST /messages**: Handles incoming WhatsApp messages.
- **GET /messages**: Verifies the WhatsApp webhook.
- **POST /webhook/sendbird**: Handles incoming messages from Sendbird.

## Project Structure

- `app.js`: Main entry point of the application. Sets up the Express server and routes.
- `services/webhook.js`: Contains webhook handlers for WhatsApp and Sendbird.
- `services/whatsapp.js`: Contains functions to forward messages to WhatsApp.

## License

This project is licensed under the MIT License.
