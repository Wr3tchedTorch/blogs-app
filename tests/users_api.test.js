const {test, describe, beforeEach} = require("node:test");
const assert = require("node:assert");
const User = require("../models/user");
const helper = require("./users_test_helper");

const app = require("../app");
const api = require("supertest")(app);

beforeEach(async () => {
    await User.deleteMany({});

    const usersArray = helper.initialUsers.map(u => new User(u));
    const promisesArray = usersArray.map(u => u.save());

    await Promise.all(promisesArray);
});

describe.only("test the users api", () => {
    test.only("get request returns the right users", async () => {
        const response = await api.get("/api/users").expect(200).expect("Content-Type", /application\/json/);
        assert.strictEqual(response.body.length, helper.initialUsers.length);
    });

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
});