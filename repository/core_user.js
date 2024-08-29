//@ts-nocheck
import CoreUser from '../models/core_user.js';

const CreateCoreUser = async (data) => {
    return await CoreUser.create(data);
};

const UpdateCoreUser = async (query, data) => {
    return await CoreUser.findOneAndUpdate(query, data);
};

const DeleteCoreUser = async (query) => {
    return await CoreUser.deleteOne(query);
};

const GetCoreUser = async (query) => {
    return await CoreUser.findOne(query).lean();
};

const ListCoreUser = async (query, per_page, page_no, sort, projection) => {
    if (per_page == -1) {
        return await CoreUser.find(query)
            .select(projection)
            .sort(sort)
            .lean();
    }
    return await CoreUser.find(query)
        .select(projection)
        .sort(sort)
        .skip((page_no - 1) * per_page)
        .limit(per_page)
        .lean();
};

const GetPaginationForCoreUser = async (query, per_page, page_no, sort) => {
    if (per_page == -1) {
        let total_record = await CoreUser.countDocuments(query);

        let pagination = {
            "per_page": per_page,
            "page_no": page_no,
            "total_rows": total_record,
            "total_pages": 1
        }
        return pagination;
    } else {
        let total_record = await CoreUser.countDocuments(query);
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

const GetCountForCoreUser = async (query) => {
    let total_record = await CoreUser.countDocuments(query);
    return total_record;
};

const UpsertCoreUser = async (query, data) => {
    return await CoreUser.findOneAndUpdate(query, data, { upsert: true });
};

export {
    CreateCoreUser,
    UpdateCoreUser,
    DeleteCoreUser,
    GetCoreUser,
    ListCoreUser,
    UpsertCoreUser,
    GetPaginationForCoreUser,
    GetCountForCoreUser
};
