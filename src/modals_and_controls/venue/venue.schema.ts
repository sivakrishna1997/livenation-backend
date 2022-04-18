import * as mongoose from 'mongoose';

export const venues = mongoose.model('venues', new mongoose.Schema({
    name: { type: String, required: true, trim: true, index: true },
    location: { type: String, index: true },
    capacity: { type: String },
    stage_layout: { type: String },
    stages: [
        {
            stage_id: { type: String },
            stage_name: { type: String }
        }
    ],
    seats: [
        {
            name: { type: String, trim: true },
            image: { type: String }
        }
    ],
    cdate: { type: Date },
    udate: { type: Date }
})
)


export const stages = mongoose.model('stages', new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    cdate: { type: Date },
    udate: { type: Date }
})
)