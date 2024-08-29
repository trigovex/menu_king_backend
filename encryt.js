//@ts-nocheck

import crypto from 'crypto'
import dotenv from "dotenv";
let secret_key = `${process.env.SELLER_APP_SECRET_KEY}`
let secret_iv = `${process.env.SELLER_APP_SECRET_IV}`
let ecnryption_method = `${process.env.SELLER_APP_ENCRYPTION_METHOD}`
dotenv.config();

// Generate secret hash with crypto to use for encryption
const key = crypto
    .createHash('sha512')
    .update(secret_key)
    .digest('hex')
    .substring(0, 32)
const encryptionIV = crypto
    .createHash('sha512')
    .update(secret_iv)
    .digest('hex')
    .substring(0, 16)


// Encrypt data
const encryptData = (data) => {
   let secret_key ="adya_sceret_keyf"
    let secret_iv ="adya_sceret_ivff"
    let ecnryption_method = "aes-256-cbc"
    console.log(secret_key,secret_iv,ecnryption_method)

    // Generate secret hash with crypto to use for encryption
    const key = crypto
        .createHash('sha512')
        .update(secret_key)
        .digest('hex')
        .substring(0, 32)
    const encryptionIV = crypto
        .createHash('sha512')
        .update(secret_iv)
        .digest('hex')
        .substring(0, 16)

    data = JSON.stringify(data)
    const cipher = crypto.createCipheriv(ecnryption_method, key, encryptionIV)
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64') // Encrypts data and converts to hex and base64
}


const decryptData = (encryptedData) => {
    const secret_key = "adya_sceret_keyf";
    const secret_iv = "adya_sceret_ivff";
    const encryption_method = "aes-256-cbc";

    // Convert the secret key and IV from hexadecimal strings to Buffer objects
    const key = Buffer.from(secret_key, 'hex');
    const iv = Buffer.from(secret_iv, 'hex');

    console.log("Secret Key:", key.toString('hex'));
    console.log("Secret IV:", iv.toString('hex'));

    try {
        const buff = Buffer.from(encryptedData, 'base64');
        const decipher = crypto.createDecipheriv(encryption_method, key, iv);
        let decryptedData = decipher.update(buff);
        decryptedData += decipher.final();
        return JSON.parse(decryptedData); // Decrypts data and parses JSON
    } catch (error) {
        console.error("Error occurred during decryption:", error);
        return null;
    }
}



const encryptData_DI = (data) => {
    let secret_key ="adya_sceret_keyf";
    let secret_iv ="adya_sceret_ivff";
    let encryption_method = "aes-256-cbc";
    
    const key = crypto.createHash('sha512').update(secret_key).digest('hex').substring(0, 32);
    const iv = crypto.createHash('sha512').update(secret_iv).digest('hex').substring(0, 16);
    
    let cipher = crypto.createCipheriv(encryption_method, key, iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64') + cipher.final('base64');
    
    return encrypted;
};

export {
    encryptData,
    decryptData,
    encryptData_DI
}