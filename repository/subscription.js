//@ts-nocheck
import Subscription from '../models/subscription.js';

const CreateSubscription = async (data) => {
    return await Subscription.create(data);
};

const UpdateSubscription = async (query, data) => {
    return await Subscription.findOneAndUpdate(query, data);
};

const DeleteSubscription = async (query) => {
    return await Subscription.deleteOne(query);
};

const GetSubscription = async (query) => {
    return await Subscription.findOne(query).lean();
};

const ListSubscription = async (query, per_page, page_no, sort, projection) => {
    if (per_page == -1) {
        return await Subscription.find(query)
            .select(projection)
            .sort(sort)
            .lean();
    }
    return await Subscription.find(query)
        .select(projection)
        .sort(sort)
        .skip((page_no - 1) * per_page)
        .limit(per_page)
        .lean();
};

const GetPaginationForSubscription = async (query, per_page, page_no, sort) => {
    if (per_page == -1) {
        let total_record = await Subscription.countDocuments(query);
        let pagination = {
            "per_page": per_page,
            "page_no": page_no,
            "total_rows": total_record,
            "total_pages": 1
        }
        return pagination;
    } else {
        let total_record = await Subscription.countDocuments(query);
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

const GetCountForSubscription = async (query) => {
    let total_record = await Subscription.countDocuments(query);
    return total_record;
};

const UpsertSubscription = async (query, data) => {
    return await Subscription.findOneAndUpdate(query, data, { upsert: true });
};

export {
    CreateSubscription,
    UpdateSubscription,
    DeleteSubscription,
    GetSubscription,
    ListSubscription,
    UpsertSubscription,
    GetPaginationForSubscription,
    GetCountForSubscription
};
