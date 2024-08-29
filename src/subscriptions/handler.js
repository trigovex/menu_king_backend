//@ts-check
import SubscriptionService from './service.js';

class SubscriptionHandler {
    constructor() {
        this.subscriptionService = new SubscriptionService();
    }

    /**
     * Handles the creation of a new subscription.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async createSubscription(req, res) {
        try {
            const data = req.body;
            const result = await this.subscriptionService.create(data);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the upsertion of a subscription (insert or update).
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async upsertSubscription(req, res) {
        try {
            const query = { _id: req.params.id };
            const data = req.body;
            const result = await this.subscriptionService.upsert(query, data);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the update of an existing subscription.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async updateSubscription(req, res) {
        try {
            const query = { _id: req.params.id };
            const data = req.body;
            const result = await this.subscriptionService.update(query, data);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the deletion of a subscription.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async deleteSubscription(req, res) {
        try {
            const query = { _id: req.params.id };
            const result = await this.subscriptionService.delete(query);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles retrieving a single subscription.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async getSubscription(req, res) {
        try {
            const query = { _id: req.params.id };
            const result = await this.subscriptionService.get(query);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles listing subscriptions with pagination and sorting.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async listSubscription(req, res) {
        try {
            const { per_page, page_no, sort } = req.query;
            const query = {}; // Adjust query as needed
            const result = await this.subscriptionService.list(query, parseInt(per_page), parseInt(page_no), sort);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default SubscriptionHandler;
