import * as mongoose from 'mongoose';

export const events = mongoose.model('events', new mongoose.Schema({
    concert_title: { type: String, required: true, trim: true },
    concert_type: { type: String, required: true, trim: true },
    main_artist: { type: String, required: true },
    capacity: { type: String },
    genre: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    graph_content: [
        {
            image: { type: String },
        }
    ],
    about: { type: String },
    performers: [
        {
            artist_id: { type: String },
            artist_name: { type: String }
        }
    ],
    venues: [
        {
            venue_id: { type: String },
            venue_name: { type: String }
        }
    ],
    additional_info: {
        title: { type: String },
        description: { type: String }
    },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    active: { type: Boolean, default: true },
    cdate: { type: Date },
    udate: { type: Date }
})
)