//@ts-check
import {
    CreateSubscription,
    UpsertSubscription,
    UpdateSubscription,
    DeleteSubscription,
    GetSubscription,
    GetPaginationForSubscription,
    ListSubscription
} from "../../repository/subscription.js";

class SubscriptionService {
    /**
     * Creates a new subscription.
     * @param {Object} data - Subscription data.
     * @returns {Promise<Object>} - The created subscription.
     */
    async create(data) {
        try {
            let resp = await CreateSubscription(data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Upserts a subscription (insert or update).
     * @param {Object} query - Query to identify the subscription to upsert.
     * @param {Object} data - Subscription data to upsert.
     * @returns {Promise<Object>} - The upserted subscription.
     */
    async upsert(query, data) {
        try {
            let resp = await UpsertSubscription(query, data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Updates an existing subscription.
     * @param {Object} query - Query to identify the subscription to update.
     * @param {Object} data - Subscription data to update.
     * @returns {Promise<Object>} - The updated subscription.
     */
    async update(query, data) {
        try {
            let resp = await UpdateSubscription(query, data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Deletes a subscription.
     * @param {Object} query - Query to identify the subscription to delete.
     * @returns {Promise<Object>} - The result of the deletion.
     */
    async delete(query) {
        try {
            let resp = await DeleteSubscription(query);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Gets a single subscription.
     * @param {Object} query - Query to identify the subscription to get.
     * @returns {Promise<Object>} - The subscription.
     */
    async get(query) {
        try {
            let resp = await GetSubscription(query);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Lists subscriptions with pagination and sorting.
     * @param {Object} query - Query to filter subscriptions.
     * @param {number} per_page - Number of subscriptions per page.
     * @param {number} page_no - Page number.
     * @param {string} sort - Sorting criteria.
     * @returns {Promise<{resp: Object, pagination: Object}>} - List of subscriptions and pagination info.
     */
    async list(query, per_page, page_no, sort) {
        try {
            let pagination = await GetPaginationForSubscription(query, per_page, page_no, sort);
            let projection = "-__v -_id -createdAt -updatedAt";
            let resp = await ListSubscription(query, per_page, page_no, sort, projection);
            return { resp, pagination };
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }
}

export default SubscriptionService;
