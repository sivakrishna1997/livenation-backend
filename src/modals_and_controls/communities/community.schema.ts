import * as mongoose from 'mongoose';

export const communities = mongoose.model('communities', new mongoose.Schema({
    community_name: { type: String, required: true, trim: true, index: true },
    community: [
        {
            artist_id: { type: String },
            artist_name: { type: String, trim: true },
            concert_id: { type: String },
            concert_title: { type: String, trim: true }
        }
    ],
    cdate: { type: Date },
    udate: { type: Date }
})
)