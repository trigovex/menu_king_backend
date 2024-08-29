//@ts-nocheck
import Restaurant from '../models/restautants.js';

const CreateRestaurant = async (data) => {
    return await Restaurant.create(data);
};

const UpdateRestaurant = async (query, data) => {
    return await Restaurant.findOneAndUpdate(query, data);
};

const DeleteRestaurant = async (query) => {
    return await Restaurant.deleteOne(query);
};

const GetRestaurant = async (query) => {
    return await Restaurant.findOne(query).lean();
};

const ListRestaurant = async (query, per_page, page_no, sort, projection) => {
    if (per_page == -1) {
        return await Restaurant.find(query)
            .select(projection)
            .sort(sort)
            .lean();
    }
    return await Restaurant.find(query)
        .select(projection)
        .sort(sort)
        .skip((page_no - 1) * per_page)
        .limit(per_page)
        .lean();
};

const GetPaginationForRestaurant = async (query, per_page, page_no, sort) => {
    if (per_page == -1) {
        let total_record = await Restaurant.countDocuments(query);
        let pagination = {
            "per_page": per_page,
            "page_no": page_no,
            "total_rows": total_record,
            "total_pages": 1
        }
        return pagination;
    } else {
        let total_record = await Restaurant.countDocuments(query);
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

const GetCountForRestaurant = async (query) => {
    let total_record = await Restaurant.countDocuments(query);
    return total_record;
};

const UpsertRestaurant = async (query, data) => {
    return await Restaurant.findOneAndUpdate(query, data, { upsert: true });
};

export {
    CreateRestaurant,
    UpdateRestaurant,
    DeleteRestaurant,
    GetRestaurant,
    ListRestaurant,
    UpsertRestaurant,
    GetPaginationForRestaurant,
    GetCountForRestaurant
};
