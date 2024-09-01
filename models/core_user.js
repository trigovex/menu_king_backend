// @ts-nocheck
import mongoose from 'mongoose';

const coreUserSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    extra_details:{type:Object},
    status: { type: String },
    otp:{type:String},
    user_type: { type: String, required: true,default:"RESTAURANT" },
    is_active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }

}, { timestamps: true });

// Pre-save hook to generate auto-increment ID
coreUserSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const latestDocument = await this.constructor.findOne({}, {}, { sort: { id: -1 } });
            this.id = latestDocument ? latestDocument.id + 1 : 1;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const CoreUser = mongoose.model('CoreUser', coreUserSchema);

export default CoreUser;
