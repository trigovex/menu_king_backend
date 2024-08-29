//@ts-nocheck
import Order from '../models/orders.js';

const CreateOrder = async (data) => {
    return await Order.create(data);
};

const UpdateOrder = async (query, data) => {
    return await Order.findOneAndUpdate(query, data);
};

const DeleteOrder = async (query) => {
    return await Order.deleteOne(query);
};

const GetOrder = async (query) => {
    return await Order.findOne(query).lean();
};

const ListOrder = async (query, per_page, page_no, sort, projection) => {
    if (per_page == -1) {
        return await Order.find(query)
            .select(projection)
            .sort(sort)
            .lean();
    }
    return await Order.find(query)
        .select(projection)
        .sort(sort)
        .skip((page_no - 1) * per_page)
        .limit(per_page)
        .lean();
};

const GetPaginationForOrder = async (query, per_page, page_no, sort) => {
    if (per_page == -1) {
        let total_record = await Order.countDocuments(query);
        let pagination = {
            "per_page": per_page,
            "page_no": page_no,
            "total_rows": total_record,
            "total_pages": 1
        }
        return pagination;
    } else {
        let total_record = await Order.countDocuments(query);
        let total_pages = Math.ceil(total_record / per_page);
        let pagination = {
            "per_page": per_page,
            "page_no": page_no,
            "total_rows": total_record,
            "total_pages": total_pages
        }
        return pagination;
    }
};

const GetCountForOrder = async (query) => {
    let total_record = await Order.countDocuments(query);
    return total_record;
};

const UpsertOrder = async (query, data) => {
    return await Order.findOneAndUpdate(query, data, { upsert: true });
};

export {
    CreateOrder,
    UpdateOrder,
    DeleteOrder,
    GetOrder,
    ListOrder,
    UpsertOrder,
    GetPaginationForOrder,
    GetCountForOrder
};
