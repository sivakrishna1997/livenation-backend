import * as mongoose from 'mongoose';

export const venues = mongoose.model('venues', new mongoose.Schema({
    name: { type: String, required: [true, "Venue Name is required"], trim: true, index: true, unique: true },
    location: { type: String, index: true },
    capacity: { type: String },
    stage_layout: { type: String },
    stages: [{ type: mongoose.Schema.Types.ObjectId, ref: "stages" }],
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
    name: { type: String, required: [true, "Stage Name is required"], trim: true },
    cdate: { type: Date },
    udate: { type: Date }
})
)