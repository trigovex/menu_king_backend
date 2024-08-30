//@ts-check
import CoreUserService from './service.js';

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
            const query = { _id: req.params.id };
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
            const { email, otp } = req.body;
            const result = await this.coreUserService.verifyOtp(email, otp);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default CoreUserHandler;
