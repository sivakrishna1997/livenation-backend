import * as mongoose from 'mongoose';

export const events = mongoose.model('events', new mongoose.Schema({
    concert_title: { type: String, required: true, trim: true, index: true },
    concert_type: { type: String, required: true, trim: true },
    capacity: { type: String },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    country: { type: String },
    add_to_carousel: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    graphic_content: {
        carousel_poster: { type: String },
        event_poster: { type: String },
        video_url: { type: String },
    },
    about: { type: String },

    main_artist: { type: mongoose.Schema.Types.ObjectId, ref: "artists", required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: "genres", required: true },
    community: { type: mongoose.Schema.Types.ObjectId, ref: "communities" },
    performers: [{ type: mongoose.Schema.Types.ObjectId, ref: "artists" }],
    venues: [{ type: mongoose.Schema.Types.ObjectId, ref: "venues" }],

    additional_info: [
        {
            title: { type: String },
            description: { type: String }
        }
    ],
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },

    cdate: { type: Date },
    udate: { type: Date }
})
)