import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

// ✅ Vercel-safe export
export default mongoose.models.Onnreview || mongoose.model("Onnreview", reviewSchema);