import * as mongoose from 'mongoose';

export const tickets = mongoose.model('tickets', new mongoose.Schema({
    concert_id: { type: String, required: true },
    concert_title: { type: String, required: true, trim: true },
    concert_venue_id: { type: String, required: true },
    concert_venue_name: { type: String, required: true, trim: true },
    event_date: { type: Date, required: true },
    stage_setup: { type: String, trim: true },

    area: { type: String, trim: true },
    row_letter: { type: String, trim: true },
    seat_number: { type: String, trim: true },
    ticket_code: { type: String, trim: true },
    ticket_price: { type: String, trim: true },
    ticket_status: { type: String, trim: true },

    cdate: { type: Date },
    udate: { type: Date }
})
)




