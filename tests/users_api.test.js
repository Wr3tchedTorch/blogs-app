const {test, describe, beforeEach, after} = require("node:test");
const assert = require("node:assert");
const User = require("../models/user");
const helper = require("./users_test_helper");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = require("../app");
const api = require("supertest")(app);

beforeEach(async () => {
    await User.deleteMany({});
    const usersArray = [];
    for (let newUser of helper.initialUsers) {
        const passwordHash = await bcrypt.hash(newUser.password, 10);        
        usersArray.push(new User({...newUser, password: passwordHash}));
    }
    const promisesArray = usersArray.map(u => u.save());
    await Promise.all(promisesArray);
});

describe("test the users api", () => {    
    test("get request returns the right user", async () => {
        const response = await api.get("/api/users").expect(200).expect("Content-Type", /application\/json/);
        assert.strictEqual(response.body.length, helper.initialUsers.length);
    });

    describe("adding new user", () => {
        test("a new user can be added", async () => {
            const user = {
                username: "lucasnetoofc",
                name: "Lucas Neto",
                password: "lucasneto123"
            };
            await api.post("/api/users").send(user).expect(201).expect("Content-Type", /application\/json/);
            const endUsers = await helper.usersInDb();
            assert.strictEqual(endUsers.length, helper.initialUsers.length+1);
        });
    
        test("a user password is correctely encripted", async () => {
            const targetUser = helper.initialUsers[0];
            const userInDb = await User.findOne({ username: targetUser.username });            

            assert(userInDb.password != targetUser.password);
            assert(await bcrypt.compare(targetUser.password, userInDb.password));
        });

        test("adding a already existing username throws a error", async () => {
            const user = {
                username: "pedro1agito",
                name: "Pedro lucas",
                password: "pedrolucas667"
            };
            const result = await api.post("/api/users").send(user).expect(400).expect("Content-Type", /application\/json/);
            const endUsers = await helper.usersInDb();

            assert.strictEqual(endUsers.length, helper.initialUsers.length);
            assert.strictEqual("`username` is expected to be unique", result.body.error);
        });
    });
});

after(() => {
    mongoose.connection.close();
});