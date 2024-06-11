const User = require("../models/user");

const initialUsers = [
    {
        username: "pedro1agito",
        name: "Pedro Thiago",
        password: "coxinha123"
    },
    {
        username: "ender gamer",
        name: "Eric Moura",
        password: "iloveminecraft"
    },
    {
        username: "hatsugameplays",
        name: "Gustavo Santos",
        password: "hatsuhatsuhatsu"
    }
];

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
};

module.exports = { initialUsers, usersInDb };