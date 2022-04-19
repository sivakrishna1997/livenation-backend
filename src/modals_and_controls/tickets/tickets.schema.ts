import * as mongoose from 'mongoose';

export const tickets = mongoose.model('tickets', new mongoose.Schema({
    concert_id: { type: String, required: true },
    concert_title: { type: String, required: true, trim: true },
    concert_venue_id: { type: String, required: true },
    concert_venue_name: { type: String, required: true, trim: true },
    stage_setup: { type: String, trim: true },
    event_date: { type: Date, required: true },
    start_time: { type: String, trim: true },
    end_time: { type: String, trim: true },

    areas: [{
        area: { type: String },
        price: { type: String },
        points: { type: String },
        rows: [{
            row_letter: { type: String },
            seat_number: { type: String },
            ticket_code: { type: String },
            ticket_status: { type: String, enum: ['available', 'sold'] },
        }]
    }],

    cdate: { type: Date },
    udate: { type: Date }
})
)




