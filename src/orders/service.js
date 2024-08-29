//@ts-check
import {
    CreateOrder,
    UpsertOrder,
    UpdateOrder,
    DeleteOrder,
    GetOrder,
    GetPaginationForOrder,
    ListOrder
} from "../../repository/orders.js";

class OrderService {
    /**
     * Creates a new order.
     * @param {Object} data - Order data.
     * @returns {Promise<Object>} - The created order.
     */
    async create(data) {
        try {
            let resp = await CreateOrder(data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Upserts an order (insert or update).
     * @param {Object} query - Query to identify the order to upsert.
     * @param {Object} data - Order data to upsert.
     * @returns {Promise<Object>} - The upserted order.
     */
    async upsert(query, data) {
        try {
            let resp = await UpsertOrder(query, data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Updates an existing order.
     * @param {Object} query - Query to identify the order to update.
     * @param {Object} data - Order data to update.
     * @returns {Promise<Object>} - The updated order.
     */
    async update(query, data) {
        try {
            let resp = await UpdateOrder(query, data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Deletes an order.
     * @param {Object} query - Query to identify the order to delete.
     * @returns {Promise<Object>} - The result of the deletion.
     */
    async delete(query) {
        try {
            let resp = await DeleteOrder(query);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Gets a single order.
     * @param {Object} query - Query to identify the order to get.
     * @returns {Promise<Object>} - The order.
     */
    async get(query) {
        try {
            let resp = await GetOrder(query);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Lists orders with pagination and sorting.
     * @param {Object} query - Query to filter orders.
     * @param {number} per_page - Number of orders per page.
     * @param {number} page_no - Page number.
     * @param {string} sort - Sorting criteria.
     * @returns {Promise<{resp: Object, pagination: Object}>} - List of orders and pagination info.
     */
    async list(query, per_page, page_no, sort) {
        try {
            let pagination = await GetPaginationForOrder(query, per_page, page_no, sort);
            let projection = "-__v -_id -createdAt -updatedAt";
            let resp = await ListOrder(query, per_page, page_no, sort, projection);
            return { resp, pagination };
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }
}

export default OrderService;
