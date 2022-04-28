import * as mongoose from 'mongoose';

export const communities = mongoose.model('communities', new mongoose.Schema({
    community_name: { type: String, required: true, trim: true, index: true },
    community: [
        {
            artist_id: { type: String },
            artist_name: { type: String },
            concert_id: { type: String, required: true },
            concert_title: { type: String, required: true, trim: true },
        }
    ],

    cdate: { type: Date },
    udate: { type: Date }
})
)