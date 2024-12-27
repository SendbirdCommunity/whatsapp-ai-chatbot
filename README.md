

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
   WHATSAPP_VERIFY_TOKEN=<your-whatsapp-verify-token>
   AI_CHATBOT_ID=<your-ai-chatbot-id>
   WHATSAPP_AUTH_TOKEN=<your-whatsapp-auth-token>
   WHATSAPP_PHONE_ID=<your-whatsapp-phone-id>
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
