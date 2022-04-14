import * as mongoose from 'mongoose';

export const genre = mongoose.model('genres', new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    active: { type: Boolean, default: true },
    cdate: { type: Date },
    udate: { type: Date }
})
)