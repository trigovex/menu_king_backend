//@ts-check
import MenuService from './service.js';

class MenuHandler {
    constructor() {
        this.menuService = new MenuService();
    }

    /**
     * Handles the creation of a new menu.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async createMenu(req, res) {
        try {
            const data = req.body;
            const result = await this.menuService.create(data);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the upsertion of a menu (insert or update).
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async upsertMenu(req, res) {
        try {
            const query = { _id: req.params.id };
            const data = req.body;
            const result = await this.menuService.upsert(query, data);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the update of an existing menu.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async updateMenu(req, res) {
        try {
            const query = { _id: req.params.id };
            const data = req.body;
            const result = await this.menuService.update(query, data);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles the deletion of a menu.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async deleteMenu(req, res) {
        try {
            const query = { _id: req.params.id };
            const result = await this.menuService.delete(query);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles retrieving a single menu.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async getMenu(req, res) {
        try {
            const query = { _id: req.params.id };
            const result = await this.menuService.get(query);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Handles listing menus with pagination and sorting.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async listMenu(req, res) {
        try {
            const { per_page, page_no, sort } = req.query;
            const query = {}; // Adjust query as needed
            const result = await this.menuService.list(query, parseInt(per_page), parseInt(page_no), sort);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default MenuHandler;
