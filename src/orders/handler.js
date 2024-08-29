//@ts-check
import OrderService from './service.js';

class OrderHandler {
    constructor() {
        this.orderService = new OrderService();
    }

    /**
     * Handles the creation of a new order.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async createOrder(req, res) {
        try {
            const data = req.body;
            const result = await this.orderService.create(data);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the upsertion of an order (insert or update).
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async upsertOrder(req, res) {
        try {
            const query = { _id: req.params.id };
            const data = req.body;
            const result = await this.orderService.upsert(query, data);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the update of an existing order.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async updateOrder(req, res) {
        try {
            const query = { _id: req.params.id };
            const data = req.body;
            const result = await this.orderService.update(query, data);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the deletion of an order.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async deleteOrder(req, res) {
        try {
            const query = { _id: req.params.id };
            const result = await this.orderService.delete(query);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles retrieving a single order.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async getOrder(req, res) {
        try {
            const query = { _id: req.params.id };
            const result = await this.orderService.get(query);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles listing orders with pagination and sorting.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async listOrder(req, res) {
        try {
            const { per_page, page_no, sort } = req.query;
            const query = {}; // Adjust query as needed
            const result = await this.orderService.list(query, parseInt(per_page), parseInt(page_no), sort);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default OrderHandler;
