//@ts-check
import {
    CreateCoreUser,
    UpsertCoreUser,
    UpdateCoreUser,
    DeleteCoreUser,
    GetCoreUser,
    GetPaginationForCoreUser,
    ListCoreUser
} from "../../repository/core_user.js";

class CoreUserService {
    async create(data) {
        try {
            let resp = await CreateCoreUser(data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    async upsert(query, data) {
        try {
            let resp = await UpsertCoreUser(query, data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    async update(query, data) {
        try {
            let resp = await UpdateCoreUser(query, data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    async delete(query) {
        try {
            let resp = await DeleteCoreUser(query);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    async get(query) {
        try {
            let resp = await GetCoreUser(query);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    async list(query, per_page, page_no, sort) {
        try {
            let pagination = await GetPaginationForCoreUser(query, per_page, page_no, sort);
            let projection = "-__v -_id -createdAt -updatedAt";
            let resp = await ListCoreUser(query, per_page, page_no, sort, projection);
            return { resp, pagination };
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

       async signup(data) {
        try {
            // Logic to create a new user
            let resp = await CreateCoreUser(data);
            return resp;
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    async login(email, password) {
        try {
            // Logic to authenticate user
            let user = await GetCoreUser({ email });

            if (!user || user.password !== password) {
                throw new Error("Invalid email or password");
            }

            // Generate token or any other login logic
            return { message: "Login successful", user };
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }

    async verifyOtp(email, otp) {
        try {
            // Logic to verify OTP
            let user = await GetCoreUser({ email });

            if (!user || user.otp !== otp) {
                throw new Error("Invalid OTP");
            }

            // OTP verified successfully
            return { message: "OTP verified successfully", user };
        } catch (err) {
            console.log("Error ====>>>", err);
            throw err;
        }
    }
}

export default CoreUserService;
