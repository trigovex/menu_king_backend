//@ts-check
import {
    CreateRestaurant,
    UpsertRestaurant,
    UpdateRestaurant,
    DeleteRestaurant,
    GetRestaurant,
    GetPaginationForRestaurant,
    ListRestaurant
} from "../../repository/restautants.js";

class RestaurantService {
    /**
     * Creates a new restaurant entry.
     * @param {Object} data - Restaurant data.
     * @returns {Promise<Object>} - The created restaurant.
     */
    async create(data) {
        try {
            let resp = await CreateRestaurant(data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Upserts a restaurant entry.
     * @param {Object} query - Query to identify the restaurant to upsert.
     * @param {Object} data - Restaurant data to upsert.
     * @returns {Promise<Object>} - The upserted restaurant.
     */
    async upsert(query, data) {
        try {
            let resp = await UpsertRestaurant(query, data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Updates an existing restaurant entry.
     * @param {Object} query - Query to identify the restaurant to update.
     * @param {Object} data - Restaurant data to update.
     * @returns {Promise<Object>} - The updated restaurant.
     */
    async update(query, data) {
        try {
            let resp = await UpdateRestaurant(query, data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Deletes a restaurant entry.
     * @param {Object} query - Query to identify the restaurant to delete.
     * @returns {Promise<Object>} - The result of the deletion.
     */
    async delete(query) {
        try {
            let resp = await DeleteRestaurant(query);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Gets a restaurant entry.
     * @param {Object} query - Query to identify the restaurant to get.
     * @returns {Promise<Object>} - The restaurant.
     */
    async get(query) {
        try {
            let resp = await GetRestaurant(query);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Lists restaurant entries with pagination.
     * @param {Object} query - Query to filter restaurants.
     * @param {number} per_page - Number of restaurants per page.
     * @param {number} page_no - Page number.
     * @param {string} sort - Sorting criteria.
     * @returns {Promise<{resp: Object, pagination: Object}>} - List of restaurants and pagination info.
     */
    async list(query, per_page, page_no, sort) {
        try {
            let pagination = await GetPaginationForRestaurant(query, per_page, page_no, sort);
            let projection = "-__v -_id -createdAt -updatedAt";
            let resp = await ListRestaurant(query, per_page, page_no, sort, projection);
            return { resp, pagination };
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }
}

export default RestaurantService;
