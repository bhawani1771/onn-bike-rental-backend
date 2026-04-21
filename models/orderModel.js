import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },

    bikeImage: { type: String, required: true },
    bikeModel: { type: String, required: true },
    rate: { type: Number, required: true },

    pickupDate: { type: String, required: true },
    returnDate: { type: String, required: true },

    totalHours: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },

    status: { type: String, default: "Pending" }
}, { timestamps: true });

// ✅ Vercel-safe export (overwrite error fix)
export default mongoose.models.Order || mongoose.model("Order", orderSchema);