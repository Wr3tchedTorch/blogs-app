const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        minLength: [3, "minLength validation failed: expected to be at least 3 characters long"],
        unique: [true, "is expected to be unique"]
    },
    password: {
        type: String,
        minLength: 3,
        required: true
    }
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;