import * as mongoose from 'mongoose';

export const communities = mongoose.model('communities', new mongoose.Schema({
    name: { type: String, required: true, trim: true, index: true },
    cdate: { type: Date },
    udate: { type: Date }
})
)