import * as mongoose from 'mongoose';

export const genre = mongoose.model('genres', new mongoose.Schema({
    name: { type: String, required: [true, "Genre Name is required"], trim: true, index: true, unique: true },
    cdate: { type: Date },
    udate: { type: Date }
})
)