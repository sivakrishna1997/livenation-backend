import * as mongoose from 'mongoose';

export const events = mongoose.model('events', new mongoose.Schema({
    concert_title: { type: String, required: true, trim: true },
    concert_type: { type: String, required: true, trim: true },
    main_artist: { type: String, required: true },
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
        }
    ],
    venues: [
        { venue_id: { type: String } }
    ],
    additional_info: { type: String },
    active: { type: Boolean, default: true },
    cdate: { type: Date },
    udate: { type: Date }
})
)