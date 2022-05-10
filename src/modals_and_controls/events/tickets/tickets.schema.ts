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
        price_type: { type: String },
        points: { type: String },
        rows: [{
            row_letter: { type: String },
            seat_number: { type: String },
            ticket_code: { type: String },
            ticket_status: { type: String, enum: ['available', 'hold', 'fastfilling', 'sold', 'cancelled', 'expired'] },
        }]
    }],

    cdate: { type: Date },
    udate: { type: Date }
})
)




export const parking_tickets = mongoose.model('parkingtickets', new mongoose.Schema({
    ticket_id: { type: String, required: true },
    price: { type: String },
    price_type: { type: String },
    distance: { type: String },
    parking_id: { type: String },
    parking_name: { type: String },
    parking_type: { type: String },
    parking_seats: [{
        type: { type: String, enum: ['vip', 'vallet', 'normal'] }, // vip, vallet, normal
        seat_number: { type: String },
        ticket_code: { type: String },
        status: { type: String, enum: ['available', 'hold', 'fastfilling', 'sold', 'cancelled', 'expired'] },
    }],

    cdate: { type: Date },
    udate: { type: Date }
})
)