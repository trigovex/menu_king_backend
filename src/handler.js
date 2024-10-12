import axios from 'axios';
import { decrypt, encrypt } from '../helpers/encryption_decryption';

class AxiosHandler {
  async makeRequest(req, res) {
    const { request } = req.body;
    
    try {
      // Configure Axios request based on the details provided in req.body
       const decrypted_data  = await decrypt(request)

       
      const response = await axios({
        method: decrypted_data?.method,
        url: decrypted_data?.baseURL,
        headers: decrypted_data?.headers,
        params: decrypted_data?.params,
        data: decrypted_data?.data, // Only applies to POST/PUT methods
      });
      const encrypted_data =  await encrypt(response)
       // Return the response
    res.send({response:encrypted_data})
    } catch (error) {
      // Handle any errors during the request
        console.log("error = > ",error)
    }
  }
}

// Export the AxiosHandler class
export default AxiosHandler;
