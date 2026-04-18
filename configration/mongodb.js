const mongoose = require("mongoose");


const dbPath = "mongodb+srv://bhawanii1771_db_user:bhawanii1777@cluster011.rdi7xym.mongodb.net/my_new_bike_db?retryWrites=true&w=majority&appName=Cluster011";

mongoose.connect(dbPath)
.then(() => {
   
    console.log(" MongoDb  Connected succesfully!");
    console.log(" Database Name: my_new_bike_db");
   
})
.catch((err) => {
    console.log(" Connection Error:", err.message);
});

module.exports = mongoose;