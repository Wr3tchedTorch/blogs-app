const test = require("node:test");
const assert = require("node:assert");

const dummy = require("../utils/list_helper").dummy;
const { listWithOneBlog } = require("./data");

test("dummy returns one", () => {
    assert.strictEqual(dummy(listWithOneBlog), 1);
});