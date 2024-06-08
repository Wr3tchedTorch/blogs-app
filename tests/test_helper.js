const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
    },
    {
        title: 'Orca Whales Have Their Own Culture',
        author: 'Eric G. Moura',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 29,
    },
    {
        title: 'Orca Whales Are Actually Closer To Dolphins',
        author: 'Eric G. Moura',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 219,
    }
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(b => b.toJSON());
};

module.exports = { blogsInDb, initialBlogs };