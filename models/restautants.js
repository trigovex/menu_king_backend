// @ts-nocheck
import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    core_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CoreUser', required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    business_details: { type: Object },
    banking_details: { type: Object },
    is_active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, { timestamps: true });

// Pre-save hook to generate auto-increment ID
restaurantSchema.pre('save', async function (next) {
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

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
