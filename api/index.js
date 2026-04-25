import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import Onnuser from "../models/onnuserModel.js";
import Listing from "../models/listingModel.js";
import Onnreview from "../models/reviewModel.js";
import Order from "../models/orderModel.js";

const app = express();

// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// ✅ MongoDB connection (serverless safe)
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("DB Connected");
};

// ✅ TEST ROUTE (important)
app.get("/api/test", (req, res) => {
    res.json({ message: "API Running ✅" });
});


// --- User API ---
app.post("/api/bikeusers", async (req, res) => {
    await connectDB();
    try {
        const newUser = new Onnuser(req.body);
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", data: newUser });
    } catch (err) {
        res.status(400).json({ message: "User registration failed", error: err.message });
    }
});

app.get("/api/bikeusers", async (req, res) => {
    await connectDB();
    try {
        const users = await Onnuser.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Fetch Error", error: err.message });
    }
});

app.delete("/api/bikeusers/:id", async (req, res) => {
    await connectDB();
    try {
        const deletedUser = await Onnuser.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User Deleted Successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Delete user failed", error: err.message });
    }
});

app.put("/api/bikeusers/:id", async (req, res) => {
    await connectDB();
    try {
        const updatedUser = await Onnuser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User Updated Successfully!", data: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
});


// --- Listing API ---
app.post("/api/listing", async (req, res) => {
    await connectDB();
    try {
        const newList = new Listing(req.body);
        await newList.save();
        res.status(201).json({ message: "Product listed successfully", data: newList });
    } catch (err) {
        res.status(400).json({ message: "Product listing failed", error: err.message });
    }
});

app.get("/api/listing", async (req, res) => {
    await connectDB();
    try {
        const allListings = await Listing.find().sort({ createdAt: -1 });
        res.status(200).json(allListings);
    } catch (err) {
        res.status(500).json({ message: "Fetch error", error: err.message });
    }
});

app.get("/api/listing/:id", async (req, res) => {
    await connectDB();
    try {
        const singleProduct = await Listing.findById(req.params.id);
        if (!singleProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(singleProduct);
    } catch (err) {
        res.status(500).json({ message: "Fetch error", error: err.message });
    }
});

app.delete("/api/listing/:id", async (req, res) => {
    await connectDB();
    try {
        const deletedItem = await Listing.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
});

app.put("/api/listing/:id", async (req, res) => {
    await connectDB();
    try {
        const updatedProduct = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
});


// --- Review API ---
app.post("/api/review", async (req, res) => {
    await connectDB();
    try {
        const newReview = new Onnreview(req.body);
        await newReview.save();
        res.status(201).json({ message: "Review submitted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

app.get("/api/review", async (req, res) => {
    await connectDB();
    try {
        const reviews = await Onnreview.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Fetch error", error: err.message });
    }
});


// --- Order API ---
app.post("/api/orders", async (req, res) => {
    await connectDB();
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: "Order failed", error: err.message });
    }
});

app.get("/api/orders", async (req, res) => {
    await connectDB();
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Fetch error" });
    }
});

app.put("/api/orders/:id", async (req, res) => {
    await connectDB();
    try {
        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});


// ✅ LOCAL + VERCEL SUPPORT
if (process.env.VERCEL !== "1") {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log("Server running on port", PORT);
    });
}

// ✅ Vercel export
export default app;