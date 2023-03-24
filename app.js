const express = require("express");
const mongoose = require("mongoose");
const User = require("./user");

mongoose.connect("mongodb://localhost:27017/expressMongo");

const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
    const users = User.find();
    res.send(users);
});

app.post("/users", (req, res) => {
    const user = new User(req.body);
    user.save();
    res.send({
        success: true,
        user
    });
});

app.post("/deleteUser", (req, res) => {
    const userId = req.body;
    
    User.findById(userId, (err, user) => {
        if (user) {
            user.remove(() => {
                res.send({
                    success: true,
                    message: "user deleted"
                });
            });
        }
    });
});





app.listen(4000);
