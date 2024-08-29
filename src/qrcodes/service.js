//@ts-check
import {
    CreateQRCode,
    UpsertQRCode,
    UpdateQRCode,
    DeleteQRCode,
    GetQRCode,
    GetPaginationForQRCode,
    ListQRCode
} from "../../repository/qrcodes.js";

class QRCodeService {
    /**
     * Creates a new QR code.
     * @param {Object} data - QR code data.
     * @returns {Promise<Object>} - The created QR code.
     */
    async create(data) {
        try {
            let resp = await CreateQRCode(data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Upserts a QR code (insert or update).
     * @param {Object} query - Query to identify the QR code to upsert.
     * @param {Object} data - QR code data to upsert.
     * @returns {Promise<Object>} - The upserted QR code.
     */
    async upsert(query, data) {
        try {
            let resp = await UpsertQRCode(query, data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Updates an existing QR code.
     * @param {Object} query - Query to identify the QR code to update.
     * @param {Object} data - QR code data to update.
     * @returns {Promise<Object>} - The updated QR code.
     */
    async update(query, data) {
        try {
            let resp = await UpdateQRCode(query, data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Deletes a QR code.
     * @param {Object} query - Query to identify the QR code to delete.
     * @returns {Promise<Object>} - The result of the deletion.
     */
    async delete(query) {
        try {
            let resp = await DeleteQRCode(query);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Gets a single QR code.
     * @param {Object} query - Query to identify the QR code to get.
     * @returns {Promise<Object>} - The QR code.
     */
    async get(query) {
        try {
            let resp = await GetQRCode(query);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    /**
     * Lists QR codes with pagination and sorting.
     * @param {Object} query - Query to filter QR codes.
     * @param {number} per_page - Number of QR codes per page.
     * @param {number} page_no - Page number.
     * @param {string} sort - Sorting criteria.
     * @returns {Promise<{resp: Object, pagination: Object}>} - List of QR codes and pagination info.
     */
    async list(query, per_page, page_no, sort) {
        try {
            let pagination = await GetPaginationForQRCode(query, per_page, page_no, sort);
            let projection = "-__v -_id -createdAt -updatedAt";
            let resp = await ListQRCode(query, per_page, page_no, sort, projection);
            return { resp, pagination };
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }
}

export default QRCodeService;
