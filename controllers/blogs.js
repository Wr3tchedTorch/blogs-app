const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const ObjectId = require('mongoose').Types.ObjectId;

blogsRouter
    .get("/", async (req, res) => {
        const results = await Blog.find({}).select("-__v");
        if (results.length === 0) {
            res.json("no data was found on the database!");
            return;
        }
        res.json(results);
    })
    .post("/", async (req, res) => {
        if (!req.body.title || !req.body.url) {
            res.status(400).end();
            return;
        }

        const newBlog = {
            ...req.body,
            likes: req.body.likes | 0,
        };

        const blog = new Blog(newBlog);
        const result = await blog.save();
        res.status(201).json(result);
    })
    .delete("/:id", async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).end();
            return;
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.status(204).end();
    })
    .put("/:id", async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).end();
            return;
        }

        const response = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(response);
    });

module.exports = blogsRouter;