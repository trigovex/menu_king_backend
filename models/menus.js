// @ts-nocheck
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    is_active: { type: Boolean, default: true }
}, { _id: false });

const submenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [itemSchema]
}, { _id: false });

const menuSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    status: { type: String, default: "ACTIVE" },
    created_by_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CoreUser', required: true },
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    submenu: [submenuSchema],
    items: [itemSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, { timestamps: true });

// Pre-save hook to generate auto-increment ID
menuSchema.pre('save', async function (next) {
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

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
