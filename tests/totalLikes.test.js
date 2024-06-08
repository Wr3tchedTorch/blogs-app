const { test, describe } = require("node:test");
const assert = require("node:assert");

const totalLikes = require("../utils/list_helper").totalLikes;
const { listWithOneBlog, listWithMultipleBlogs } = require("./data");

describe("total likes sum", () => {
    test("empty list returns zero", () => {
        assert.strictEqual(totalLikes([]), 0);
    });

    test("list with one blog return that blog value", () => {
        assert.strictEqual(totalLikes(listWithOneBlog), 5);
    });

    test("list with multiple blogs returns correct value", () => {
        assert.strictEqual(totalLikes(listWithMultipleBlogs), 253);
    });
});