import * as mongoose from 'mongoose';

export const artist = mongoose.model('artists', new mongoose.Schema({
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String },
    photo_url: { type: String },
    social_media: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        youtube: { type: String },
        soundcloud: { type: String },
        bandcamp: { type: String },
        spotify: { type: String },
        tumblr: { type: String },
        musicradar: { type: String },
    },
    cdate: { type: Date },
    udate: { type: Date }
})
)