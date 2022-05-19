import * as mongoose from 'mongoose';

export const communities = mongoose.model('communities', new mongoose.Schema({
    name: { type: String, required: [true, "Community Name is required"], trim: true, index: true, unique: true },
    cdate: { type: Date },
    udate: { type: Date }
})
)