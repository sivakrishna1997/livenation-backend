import * as mongoose from 'mongoose';

export const inventory = mongoose.model('inventory', new mongoose.Schema({
    incomming_number: {
        type: String,
        required: [true, "Inventory incomming number is required"],
        unique: true,
        trim: true,
    },
    concert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
        required: [true, "Event is required"]
    },
    inventory_date: { type: Date, required: [true, "Date is required"] },
    purpose: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "inventory_purpose",
        required: [true, "Purpose is required"]
    },
    reference_number: { type: String, trim: true },
    remarks: { type: String, trim: true },

    plu_maintenance: [
        {
            plu_master: { type: mongoose.Schema.Types.ObjectId, ref: "plu_master" },
            incomming_quantity: { type: Number },
            outgoing_quantity: { type: Number },
            remaining_quantity: { type: Number },
            sub_total_unit_price_based: { type: Number },
            sub_total_srp_based: { type: Number },
        }
    ],

    cdate: { type: Date },
    udate: { type: Date }
})
)


export const inventory_purpose = mongoose.model('inventory_purpose', new mongoose.Schema({
    name: { type: String, required: [true, "Purpose Name is required"], trim: true, unique: true },
})
)