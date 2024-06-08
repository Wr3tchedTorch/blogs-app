const { test, describe } = require("node:test");
const assert = require("node:assert");

const mostLikes = require("../utils/list_helper").mostLikes;
const { listWithOneBlog, listWithMultipleBlogs } = require("./data");

describe("most likes", () => {
    test("one blog returns its likes", () => {
        assert.deepStrictEqual(mostLikes(listWithOneBlog), { author: 'Edsger W. Dijkstra', likes: 5});
    });
    test("multiple blogs returns correct value", () => {
        assert.deepStrictEqual(mostLikes(listWithMultipleBlogs), { author: 'Eric G. Moura', likes: 219});
    });
});
