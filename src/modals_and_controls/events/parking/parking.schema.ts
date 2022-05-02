import * as mongoose from 'mongoose';

export const parking = mongoose.model('parking', new mongoose.Schema({
    ticket_id: { type: String, required: true },
    parking_slot_for_packages: { type: Number },
    vallet_parking_slots: { type: Number },
    vip_parking_slots: { type: Number },


    // start_time: { type: String, trim: true },
    // end_time: { type: String, trim: true },

    cdate: { type: Date },
    udate: { type: Date }
})
)




