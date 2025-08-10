const crypto = require("crypto")
const Products = require('../model/model');
require('dotenv').config();

const encrypt = async(req,res) => {

    try{

        const key = Buffer.from(process.env.ENCRYPTION_KEY, "base64");  // Decode the encryption key from base64 into a Buffer
        const iv = crypto.randomBytes(16);

        const data = await Products.find({});

        const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

        // Encrypt the JSON string of data
        let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
        encrypted += cipher.final("base64");

        // Get the authentication tag (used by GCM to verify integrity)
        const authTag = cipher.getAuthTag().toString("base64")

        res.status(200).json({
            success: true,
            message: "Encrypted data sent successfully",
            data: encrypted,
            iv: iv.toString("base64"),
            authTag,
            key: key.toString("base64")
        })

    }
    catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        })

    }

}


module.exports = {encrypt};