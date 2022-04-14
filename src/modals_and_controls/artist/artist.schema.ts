import * as mongoose from 'mongoose';

export const artist = mongoose.model('artist', new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String },
    active: { type: Boolean, default: true },
    cdate: { type: Date },
    udate: { type: Date }
})
)