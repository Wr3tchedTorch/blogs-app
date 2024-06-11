const bcrypt = require("bcrypt");
const User = require("../models/user");
const userRouter = require("express").Router();

userRouter
    .get("/", async (req, res) => {
        const users = await User.find({});                
        res.json(users).status(200);
    })
    .post("/", async (req, res) => {
        const body = req.body;
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: body.username,
            name:     body.name,
            password: passwordHash
        });
        await user.save();
        res.status(201).json(user);
    })
    .delete("/", async (req, res) => {
        await User.deleteMany({});
        res.status(204).end();
    });

module.exports = userRouter;