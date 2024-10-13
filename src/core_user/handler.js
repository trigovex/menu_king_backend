// @ts-nocheck
import CoreUserService from './service.js';
import jwt  from 'jsonwebtoken';

class CoreUserHandler {
    constructor() {
        this.coreUserService = new CoreUserService();
    }

    async createCoreUser(req, res) {
        try {
            const data = req.body;
            const result = await this.coreUserService.create(data);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async upsertCoreUser(req, res) {
        try {
            const query = { _id: req.params.id };
            const data = req.body;
            const result = await this.coreUserService.upsert(query, data);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateCoreUser(req, res) {
        try {
            const query = { _id: req.params.id };
            const data = req.body;
            const result = await this.coreUserService.update(query, data);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteCoreUser(req, res) {
        try {
            const query = { _id: req.params.id };
            const result = await this.coreUserService.delete(query);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getCoreUser(req, res) {
        try {
            const query = { id: req.params.id };
            const result = await this.coreUserService.get(query);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async listCoreUser(req, res) {
        try {
            const { per_page, page_no, sort } = req.query;
            const query = {}; // Adjust query as needed
            const result = await this.coreUserService.list(query, parseInt(per_page), parseInt(page_no), sort);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

        async signup(req, res) {
        try {
            const data = req.body;
            const result = await this.coreUserService.signup(data);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Login method
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this.coreUserService.login(email, password);
             res.status(200).json(result);
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }

    // Verify OTP method
    async verifyOtp(req, res) {
        try {
            const { email, otp,id } = req.body;
            const result = await this.coreUserService.verifyOtp(email, otp);
             let token="";
            let message =""
            let status=true
            if(result?.status){
                  // Generate JWT token
             token = jwt.sign(result, // Payload
                    process.env.JWTKEY_SECRET_TOKEN, // Secret key
                    { expiresIn: '1h' } // Token expiration time
                );
                message="token generated successfully"
                status=true
 
            }else{
                 message="Invalid OTP/token failed to generate"
                status=false
            }

            res.status(200).json({status:status,message:message,token:token,user:result});
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

     async checkToken(req, res) {
        try {
            const data = req.body;
            const decoded = jwt.decode(data?.token);
            const result = await this.coreUserService.get({id:decoded?.id});
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


}

export default CoreUserHandler;
