const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const mongoose = require("mongoose");

const app = require("../app");
const api = require("supertest")(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogArray = helper.initialBlogs.map(b => new Blog(b));
    const promiseArray = blogArray.map(b => b.save());

    await Promise.all(promiseArray);
});

describe("testing the blogs api", () => {
    describe("getting the blogs", () => {
        test("get request returns the right blogs", async () => {
            const response = await api.get("/api/blogs").expect(200).expect("Content-Type", /application\/json/);

            assert.strictEqual(response.body.length, helper.initialBlogs.length);
        });
        test("unique identifier of the blogs", async () => {
            const blogs = await helper.blogsInDb();

            assert("id" in blogs[0], "blogs don't have the expected identifier 'id'");
        });
    });

    describe("adding new blogs to database", () => {
        test("new blog can added to the database", async () => {
            const newBlog = {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
            };

            const result = await api.post("/api/blogs").send(newBlog).expect(201).expect("Content-Type", /application\/json/);
            const newBlogs = await helper.blogsInDb();
            assert.strictEqual(newBlogs.length, helper.initialBlogs.length + 1);
            delete result.body.id;
            assert.deepStrictEqual(result.body, newBlog);
        });

        test("like property missing from a newly added blog", async () => {
            const newBlog = {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            };

            const result = await api.post("/api/blogs").send(newBlog).expect(201).expect("Content-Type", /application\/json/);
            const newBlogs = await helper.blogsInDb();
            assert.strictEqual(newBlogs.length, helper.initialBlogs.length + 1);
            assert.deepStrictEqual(result.body.likes, 0);
        });

        test("respond with status code 400 when title property is missing", async () => {
            const newBlog = {
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            };
            await api.post("/api/blogs").send(newBlog).expect(400);
        });

        test("respond with status code 400 when url property missing", async () => {
            const newBlog = {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
            };
            await api.post("/api/blogs").send(newBlog).expect(400);
        });

    });

    describe("deleting blogs from database", () => {
        test("deleting blogs from database", async () => {
            const blogs = await helper.blogsInDb();
            const targetBlog = blogs[0];

            await api.delete(`/api/blogs/${targetBlog.id}`).expect(204);
            const blogsAfter = await helper.blogsInDb();

            assert.strictEqual(blogsAfter.length, helper.initialBlogs.length - 1);
        });

        test("respond with status code 400 when using invalid identifier", async () => {
            await api.delete("/api/blogs/invalidId").expect(400);
        });
    });
    describe("updating a blog", () => {
        test("updating a blog likes", async () => {
            const blogs = await helper.blogsInDb();
            const updatedBlog = { ...blogs[0], likes: blogs[0].likes + 100 };

            const response = await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog).expect(200);
            assert.strictEqual(response.body.likes, updatedBlog.likes);
        });
        test("respond with status code 400 when using invalid identifier", async () => {
            const blogs = await helper.blogsInDb();
            const updatedBlog = { ...blogs[0], likes: blogs[0].likes + 100 };
            
            await api.put("/api/blogs/invalidId").send(updatedBlog).expect(400);
        });
    });
});

after(() => {
    mongoose.connection.close();
});