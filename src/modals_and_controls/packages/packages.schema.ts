import * as mongoose from 'mongoose';

export const packages = mongoose.model('packages', new mongoose.Schema({
    title: { type: String, required: true, trim: true, index: true },
    price: { type: String },
    accumulated_points: { type: String },
    available_quantity: { type: String },
    inclusions: { type: String },

    cdate: { type: Date },
    udate: { type: Date }
})
)