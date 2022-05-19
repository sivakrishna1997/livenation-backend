import * as mongoose from 'mongoose';

export const events = mongoose.model('events', new mongoose.Schema({
    concert_title: { type: String, required: [true, "Concert Title is required"], trim: true, index: true },
    concert_type: { type: String, required: [true, "Concert Type is required"], trim: true },
    capacity: { type: String, required: [true, "Capacity is required"] },
    start_date: { type: Date, required: [true, "Start Date is required"] },
    end_date: { type: Date, required: [true, "End Date is required"] },
    country: { type: String, required: [true, "Country is required"] },
    add_to_carousel: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    graphic_content: {
        carousel_poster: { type: String },
        event_poster: { type: String },
        video_url: { type: String },
    },
    about: { type: String },

    main_artist: { type: mongoose.Schema.Types.ObjectId, ref: "artists", required: [true, "Main Artist is required"] },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: "genres", required: [true, "Genre is required"] },
    community: { type: mongoose.Schema.Types.ObjectId, ref: "communities" },
    performers: [{ type: mongoose.Schema.Types.ObjectId, ref: "artists" }],
    venues: [{ type: mongoose.Schema.Types.ObjectId, ref: "venues" }],

    additional_info: [
        {
            title: { type: String },
            description: { type: String }
        }
    ],
    status: { type: String, enum: [{ values: ['pending', 'approved', 'rejected'], message: "Status must be 'pending' or 'approved' or 'rejected'" }], default: 'pending' },

    cdate: { type: Date },
    udate: { type: Date }
})
)