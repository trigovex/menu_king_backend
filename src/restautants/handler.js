//@ts-check
import RestaurantService from './service.js';

class RestaurantHandler {
    constructor() {
        this.restaurantService = new RestaurantService();
    }

    /**
     * Handles the creation of a new restaurant.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async createRestaurant(req, res) {
        try {
            const data = req.body;
            const result = await this.restaurantService.create(data);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the upsertion of a restaurant (insert or update).
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async upsertRestaurant(req, res) {
        try {
            const query = { _id: req.params.id };
            const data = req.body;
            const result = await this.restaurantService.upsert(query, data);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the update of an existing restaurant.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async updateRestaurant(req, res) {
        try {
            const query = { _id: req.params.id };
            const data = req.body;
            const result = await this.restaurantService.update(query, data);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the deletion of a restaurant.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async deleteRestaurant(req, res) {
        try {
            const query = { _id: req.params.id };
            const result = await this.restaurantService.delete(query);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles retrieving a single restaurant.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async getRestaurant(req, res) {
        try {
            const query = { _id: req.params.id };
            const result = await this.restaurantService.get(query);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles listing restaurants with pagination and sorting.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async listRestaurant(req, res) {
        try {
            const { per_page, page_no, sort } = req.query;
            const query = {}; // Adjust query as needed
            const result = await this.restaurantService.list(query, parseInt(per_page), parseInt(page_no), sort);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default RestaurantHandler;
