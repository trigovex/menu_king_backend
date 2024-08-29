//@ts-check
import {
    CreateMenu,
    UpsertMenu,
    UpdateMenu,
    DeleteMenu,
    GetMenu,
    GetPaginationForMenu,
    ListMenu
} from "../../repository/menus.js";

class MenuService {
    /**
     * Creates a new menu.
     * @param {Object} data - Menu data.
     * @returns {Promise<Object>} - The created menu.
     */
    async create(data) {
        try {
            let resp = await CreateMenu(data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Upserts a menu (insert or update).
     * @param {Object} query - Query to identify the menu to upsert.
     * @param {Object} data - Menu data to upsert.
     * @returns {Promise<Object>} - The upserted menu.
     */
    async upsert(query, data) {
        try {
            let resp = await UpsertMenu(query, data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Updates an existing menu.
     * @param {Object} query - Query to identify the menu to update.
     * @param {Object} data - Menu data to update.
     * @returns {Promise<Object>} - The updated menu.
     */
    async update(query, data) {
        try {
            let resp = await UpdateMenu(query, data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Deletes a menu.
     * @param {Object} query - Query to identify the menu to delete.
     * @returns {Promise<Object>} - The result of the deletion.
     */
    async delete(query) {
        try {
            let resp = await DeleteMenu(query);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Gets a single menu.
     * @param {Object} query - Query to identify the menu to get.
     * @returns {Promise<Object>} - The menu.
     */
    async get(query) {
        try {
            let resp = await GetMenu(query);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Lists menus with pagination and sorting.
     * @param {Object} query - Query to filter menus.
     * @param {number} per_page - Number of menus per page.
     * @param {number} page_no - Page number.
     * @param {string} sort - Sorting criteria.
     * @returns {Promise<{resp: Object, pagination: Object}>} - List of menus and pagination info.
     */
    async list(query, per_page, page_no, sort) {
        try {
            let pagination = await GetPaginationForMenu(query, per_page, page_no, sort);
            let projection = "-__v -_id -createdAt -updatedAt";
            let resp = await ListMenu(query, per_page, page_no, sort, projection);
            return { resp, pagination };
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }
}

export default MenuService;
