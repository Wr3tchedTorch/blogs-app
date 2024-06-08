const { test, describe } = require("node:test");
const assert = require("node:assert");

const mostBlogs = require("../utils/list_helper").mostBlogs;
const { listWithOneBlog, listWithMultipleBlogs } = require("./data");

describe("author with most blogs", () => {
    test("list with one blogs returns that blog author", () => {
        assert.deepStrictEqual(mostBlogs(listWithOneBlog), { author: "Edsger W. Dijkstra", blogs: 1 });
    });

    test("list with multiple blogs returns correct author", () => {
        assert.deepStrictEqual(mostBlogs(listWithMultipleBlogs), { author: "Eric G. Moura", blogs: 2 });
    });
});