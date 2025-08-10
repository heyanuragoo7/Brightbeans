Encrypted Products API with React Frontend
Overview
This project demonstrates encrypting product data on the backend using AES-256-GCM and decrypting it securely on the React frontend using the Web Crypto API. It provides a secure way to transfer sensitive product data between the server and client.

Project Structure
Backend: Node.js + Express API encrypting product data from MongoDB using crypto module.

Frontend: React app fetching encrypted data and decrypting it in-browser using Web Crypto API.

Encryption: AES-256-GCM with a 256-bit key, random IV, and authentication tag.

Setup and Running Instructions
Prerequisites
Node.js (v14+ recommended)

npm or yarn

MongoDB instance with a Products collection seeded with product data

Backend Setup
Clone the repository.

Navigate to the backend directory (or root if combined).

Create a .env file with these variables:

PORT=3000
ENCRYPTION_KEY=<your_base64_encoded_32_byte_key>
MONGODB_URI=<your_mongodb_connection_string>

Install Dependencies 

npm install

To Start Project 

npm run start
