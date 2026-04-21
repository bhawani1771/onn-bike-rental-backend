import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    image: { type: String, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
    rate:  { type: Number, required: true },
    km:    { type: Number, required: true },
    stock: { type: Number, required: true },
    extracost: { type: Number, default: 0 },

    meta: {
        title: { type: String },       
        description: { type: String },
        keywords: { type: String }    
    }

}, { timestamps: true });

// ✅ IMPORTANT CHANGE
export default mongoose.models.Listing || mongoose.model("Listing", listingSchema);