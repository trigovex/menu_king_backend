//@ts-check
import QRCodeService from './service.js';

class QRCodeHandler {
    constructor() {
        this.qrCodeService = new QRCodeService();
    }

    /**
     * Handles the creation of a new QR code.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async createQRCode(req, res) {
        try {
            const data = req.body;
            const result = await this.qrCodeService.create(data);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the upsertion of a QR code (insert or update).
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async upsertQRCode(req, res) {
        try {
            const query = { _id: req.params.id };
            const data = req.body;
            const result = await this.qrCodeService.upsert(query, data);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the update of an existing QR code.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async updateQRCode(req, res) {
        try {
            const query = { _id: req.params.id };
            const data = req.body;
            const result = await this.qrCodeService.update(query, data);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the deletion of a QR code.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async deleteQRCode(req, res) {
        try {
            const query = { _id: req.params.id };
            const result = await this.qrCodeService.delete(query);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles retrieving a single QR code.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async getQRCode(req, res) {
        try {
            const query = { _id: req.params.id };
            const result = await this.qrCodeService.get(query);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles listing QR codes with pagination and sorting.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async listQRCode(req, res) {
        try {
            const { per_page, page_no, sort } = req.query;
            const query = {}; // Adjust query as needed
            const result = await this.qrCodeService.list(query, parseInt(per_page), parseInt(page_no), sort);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default QRCodeHandler;
