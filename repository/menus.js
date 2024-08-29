//@ts-nocheck
import Menu from '../models/menus.js';

const CreateMenu = async (data) => {
    return await Menu.create(data);
};

const UpdateMenu = async (query, data) => {
    return await Menu.findOneAndUpdate(query, data);
};

const DeleteMenu = async (query) => {
    return await Menu.deleteOne(query);
};

const GetMenu = async (query) => {
    return await Menu.findOne(query).lean();
};

const ListMenu = async (query, per_page, page_no, sort, projection) => {
    if (per_page == -1) {
        return await Menu.find(query)
            .select(projection)
            .sort(sort)
            .lean();
    }
    return await Menu.find(query)
        .select(projection)
        .sort(sort)
        .skip((page_no - 1) * per_page)
        .limit(per_page)
        .lean();
};

const GetPaginationForMenu = async (query, per_page, page_no, sort) => {
    if (per_page == -1) {
        let total_record = await Menu.countDocuments(query);
        let pagination = {
            "per_page": per_page,
            "page_no": page_no,
            "total_rows": total_record,
            "total_pages": 1
        }
        return pagination;
    } else {
        let total_record = await Menu.countDocuments(query);
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

const GetCountForMenu = async (query) => {
    let total_record = await Menu.countDocuments(query);
    return total_record;
};

const UpsertMenu = async (query, data) => {
    return await Menu.findOneAndUpdate(query, data, { upsert: true });
};

export {
    CreateMenu,
    UpdateMenu,
    DeleteMenu,
    GetMenu,
    ListMenu,
    UpsertMenu,
    GetPaginationForMenu,
    GetCountForMenu
};
