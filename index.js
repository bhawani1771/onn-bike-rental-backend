const express = require("express");
const cors = require("cors");
require("./configration/mongodb");

const Onnuser = require("./models/onnuserModel");
const Listing = require("./models/listingModel");
const Onnreview = require("./models/reviewModel");
const Order = require("./models/orderModel");


const app = express();
app.use(cors());
app.use(express.json());


// userapi

app.post("/api/bikeusers", async (req, res) => {
    try {
        const newUser = new Onnuser(req.body);
        await newUser.save();
        res.status(201).json({ message: "User registered succesfully", data: "newUser" });
    } catch (err) {
        res.status(400).json({ message: "User registered Fail", error: err.message })
    }
});

app.get("/api/bikeusers", async (req, res) => {
    try {
        const users = await Onnuser.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Fetch Error", error: err.message });
    }
});


app.delete("/api/bikeusers/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await Onnuser.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not registered" });
        }

        res.status(200).json({ message: "User Deleted Successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error in delete user", error: err.message });
    }
});




app.put("/api/bikeusers/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;

        const updatedUser = await Onnuser.findByIdAndUpdate(id, newData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User Updated Successfully!",
            data: updatedUser
        });
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
});









// listing ki api


app.post("/api/listing", async (req, res) => {
    try {
        const newList = new Listing(req.body);
        await newList.save();
        res.status(201).json({ message: "Product listed succesfully", data: "newList" })
    } catch (err) {
        res.status(400).json({ message: "Product listed failed try again", error: err.message })
    }
});


app.get("/api/listing", async (req, res) => {
    try {

        const allListings = await Listing.find().sort({ createdAt: -1 });
        res.status(200).json(allListings);
    } catch (err) {
        res.status(500).json({ message: "Error in fetching data", error: err.message });
    }
});

app.delete("/api/listing/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedItem = await Listing.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product successfully delete ho gaya!" });
    } catch (err) {
        res.status(500).json({ message: "Product Delete failed", error: err.message });
    }
});

app.put("/api/listing/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const updatedProduct = await Listing.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "product" });
        }

        res.status(200).json({
            message: "Product updated succesfully",
            data: updatedProduct
        });
    } catch (err) {
        res.status(500).json({ message: "Updated fail", error: err.message });
    }
});



// single product ke liye 




// Single Product Fetch karne ke liye (Detail Page ke liye)
app.get("/api/listing/:id", async (req, res) => {
    try {
        const id = req.params.id; // Frontend se aayi ID pakadi
        const singleProduct = await Listing.findById(id);

        if (!singleProduct) {
            return res.status(404).json({ message: "Product nahi mila" });
        }

        res.status(200).json(singleProduct);
    } catch (err) {
        res.status(500).json({ message: "Data fetch karne mein galti hui", error: err.message });
    }
});





// review api



app.post("/api/review", async (req, res) => {
    try {
        const newReview = new Onnreview(req.body);
        await newReview.save();
        res.status(200).json({ message: "Review Submit Succesfully" });
    } catch (err) {
        res.status(500).json({ message: "Server problem please try agai later", error: err.message })
    }
});


app.get("/api/review", async (req, res) => {
    try {
        const Review = await Onnreview.find().sort({ createdAt: -1 });
       res.status(200).json(Review);
    }catch(err){
        res.status(500).json({message : "Fetch error", error : err.message})
    }
});




// order api




app.post("/api/orders" , async (req , res)=>{
   try{
     const neworder = new Order(req.body);
     const savedOrder = await neworder.save();
     res.status(201).json(savedOrder);
   }catch(err){
     res.status(404).json({message : "Order fail" , error: err});
   }
})



app.get("/api/orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Data nahi mil raha" });
    }
});





const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:4000`);
});
