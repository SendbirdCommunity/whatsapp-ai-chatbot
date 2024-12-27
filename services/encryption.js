const CryptoJS = require("crypto-js"); // Import the crypto-js library for encryption and decryption

// Retrieve encryption key and IV from environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 characters (256 bits)
const IV = process.env.IV; // Must be 16 characters (128 bits)

// Parse encryption key and IV to Hex format
const key = CryptoJS.enc.Hex.parse(ENCRYPTION_KEY);
const iv = CryptoJS.enc.Hex.parse(IV);

// Function to encrypt a given text
function encrypt(text) {
    const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv }); // Encrypt the text using AES encryption
    return toUrlSafeBase64(encrypted.toString()); // Convert the encrypted text to URL-safe Base64 format
}

// Function to decrypt a given URL-safe Base64 encrypted text
function decrypt(urlSafeEncryptedText) {
    const base64EncryptedText = fromUrlSafeBase64(urlSafeEncryptedText); // Convert URL-safe Base64 to standard Base64
    const decrypted = CryptoJS.AES.decrypt(base64EncryptedText, key, { iv: iv }); // Decrypt the text using AES decryption
    return decrypted.toString(CryptoJS.enc.Utf8); // Convert the decrypted text to UTF-8 string
}

// Export the encrypt and decrypt functions
module.exports = { encrypt, decrypt };

// Utility function to convert Base64 string to URL-safe Base64 format
function toUrlSafeBase64(base64String) {
    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // Replace + with -, / with _, and remove trailing =
}

// Utility function to convert URL-safe Base64 string to standard Base64 format
function fromUrlSafeBase64(urlSafeBase64) {
    let base64String = urlSafeBase64.replace(/-/g, '+').replace(/_/g, '/'); // Replace - with + and _ with /
    while (base64String.length % 4) {
        base64String += '='; // Add padding = to make the length a multiple of 4
    }
    return base64String;
}
