import fs from 'fs';
import { promisify } from 'util';
import { Buffer } from 'buffer';

const readFileAsync = promisify(fs.readFile);

async function file_to_base64(filePath) {
  try {
    // Read the file
    const data = await readFileAsync(filePath);
 
    // Convert the file data to a Base64 string
    const base64Data = Buffer.from(data).toString('base64');
    
    return base64Data;
  } catch (error) {
    throw error;
  }
}

export default file_to_base64;
