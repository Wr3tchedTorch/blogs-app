const { test, describe } = require("node:test");
const assert = require("node:assert");

const favoriteBlog = require("../utils/list_helper").favoriteBlog;
const { listWithOneBlog, listWithMultipleBlogs } = require("./data");

describe("get favorite blog", () => {
    test("list with one blog returns that blog likes", () => {
        assert.deepStrictEqual(favoriteBlog(listWithOneBlog), {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        });
    });

    test("list with multiple blogs returns the correct value", () => {
        assert.deepStrictEqual(favoriteBlog(listWithMultipleBlogs), {
            _id: '5a422aa71b54a676234d1786',
            title: 'Orca Whales Are Actually Closer To Dolphins',
            author: 'Eric G. Moura',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 219,
            __v: 0
        });
    });

    test("list with no blogs returns zero", () => {
        assert.strictEqual(favoriteBlog([]), 0);
    });
});