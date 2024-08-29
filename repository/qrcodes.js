// @ts-nocheck
import QRCode from '../models/qrcodes.js';

const CreateQRCode = async (data) => {
    return await QRCode.create(data);
};

const UpdateQRCode = async (query, data) => {
    return await QRCode.findOneAndUpdate(query, data);
};

const DeleteQRCode = async (query) => {
    return await QRCode.deleteOne(query);
};

const GetQRCode = async (query) => {
    return await QRCode.findOne(query).lean();
};

const ListQRCode = async (query, per_page, page_no, sort, projection) => {
    if (per_page === -1) {
        return await QRCode.find(query)
            .select(projection)
            .sort(sort)
            .lean();
    }
    return await QRCode.find(query)
        .select(projection)
        .sort(sort)
        .skip((page_no - 1) * per_page)
        .limit(per_page)
        .lean();
};

const GetPaginationForQRCode = async (query, per_page, page_no, sort) => {
    if (per_page === -1) {
        let total_record = await QRCode.countDocuments(query);
        let pagination = {
            "per_page": per_page,
            "page_no": page_no,
            "total_rows": total_record,
            "total_pages": 1
        };
        return pagination;
    } else {
        let total_record = await QRCode.countDocuments(query);
        let total_pages = Math.ceil(total_record / per_page);
        let pagination = {
            "per_page": per_page,
            "page_no": page_no,
            "total_rows": total_record,
            "total_pages": total_pages
        };
        return pagination;
    }
};

const GetCountForQRCode = async (query) => {
    let total_record = await QRCode.countDocuments(query);
    return total_record;
};

const UpsertQRCode = async (query, data) => {
    return await QRCode.findOneAndUpdate(query, data, { upsert: true });
};

export {
    CreateQRCode,
    UpdateQRCode,
    DeleteQRCode,
    GetQRCode,
    ListQRCode,
    UpsertQRCode,
    GetPaginationForQRCode,
    GetCountForQRCode
};
