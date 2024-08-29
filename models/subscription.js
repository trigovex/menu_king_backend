// @ts-nocheck
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    core_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CoreUser', required: true },
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    plan_name: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    is_active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, { timestamps: true });

// Pre-save hook to generate auto-increment ID
subscriptionSchema.pre('save', async function (next) {
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

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
