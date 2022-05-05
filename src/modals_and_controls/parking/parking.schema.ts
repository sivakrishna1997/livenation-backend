import * as mongoose from 'mongoose';

export const parking = mongoose.model('parkings', new mongoose.Schema({
    name: { type: String, trim: true },
    image: { type: String },
    location: { type: String },
    description: { type: String },
    parking_slot_for_packages: { type: Number },
    vallet_parking_slots: { type: Number },
    vip_parking_slots: { type: Number },

    // start_time: { type: String, trim: true },
    // end_time: { type: String, trim: true },
    cdate: { type: Date },
    udate: { type: Date }
})
)




