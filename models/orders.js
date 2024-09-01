// @ts-nocheck
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu.items', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    variant:{type:Object},
    addons:{type:Object},
}, { _id: false });

const orderSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CoreUser', required: true },
    items: [orderItemSchema],
    total_price: { type: Number, required: true },
    status: { type: String, default: "PENDING" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, { timestamps: true });

// Pre-save hook to generate auto-increment ID
orderSchema.pre('save', async function (next) {
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

const Order = mongoose.model('Order', orderSchema);

export default Order;
