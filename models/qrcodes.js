// @ts-nocheck
import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    restaurant_id:{type:Number},
    core_user_id: {type:Number},
    qr_code_file: { 
        type: String,  // Store file URL or path as a string
        required: true 
    },
    status: { 
        type: String,
        default: 'active' 
    },
    is_active: { 
        type: Boolean, 
        default: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

// Pre-save hook to generate auto-increment ID
qrCodeSchema.pre('save', async function (next) {
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

const QRCode = mongoose.model('QRCode', qrCodeSchema);

export default QRCode;
