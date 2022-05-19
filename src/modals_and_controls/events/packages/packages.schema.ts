import * as mongoose from 'mongoose';

export const packages = mongoose.model('packages', new mongoose.Schema({
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "tickets", required: [true, "Ticket is required"] },
    title: { type: String, required: [true, "Package Name is required"], trim: true, index: true },
    price: { type: String },
    price_type: { type: String },
    equivalent_points: { type: String },
    available_quantity: { type: String },
    inclusions: { type: String },
    cdate: { type: Date },
    udate: { type: Date }
})
)