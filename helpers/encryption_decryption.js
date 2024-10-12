import crypto from 'crypto';

// Define the encryption algorithm
const algorithm = 'aes-256-cbc';

// Use a static 32-byte key and 16-byte IV (these should be securely stored and kept secret)
const key = Buffer.from('12345678901234567890123456789012'); // Example 32-byte key (change to your actual key)
const iv = Buffer.from('1234567890123456'); // Example 16-byte IV (change to your actual IV)

// Asynchronous method to encrypt JSON data
export const encrypt = async (data) => {
  try {
    // Convert the input data to a JSON string before encrypting
    const jsonData = JSON.stringify(data);
    
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(jsonData, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      iv: iv.toString('hex'), // Even though IV is static, include it for consistency
      encryptedData: encrypted
    };
  } catch (error) {
    throw new Error(`Encryption failed: ${error.message}`);
  }
};

// Asynchronous method to decrypt and return JSON data
export const decrypt = async (encryptedData, ivHex) => {
  try {
    // No need to use `ivHex` since IV is static, but keeping parameter for API consistency
    const decipher = crypto.createDecipheriv(algorithm, key, iv); // Static IV used here
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // Parse the decrypted string back to a JSON object
    return JSON.parse(decrypted);
  } catch (error) {
    throw new Error(`Decryption failed: ${error.message}`);
  }
};
