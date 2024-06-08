const lodash = require("lodash");
const logger = require("./logger");

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const reducer = (sum, item) => sum + item.likes;

    return blogs.length === 1 ? blogs[0].likes : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return 0;

    let myFavoriteBlog = { likes: Number.MIN_SAFE_INTEGER };
    for (const blog of blogs) {
        if (blog.likes > myFavoriteBlog.likes) {
            myFavoriteBlog = blog;
        }
    }
    return myFavoriteBlog;
};

const mostBlogs = (blogs) => {
    if (blogs.length === 1) {
        return { author: blogs[0].author, blogs: 1 };
    }

    const authorCounts = lodash.countBy([...blogs.map(b => b.author)]);

    let mostVotedAuthor = { blogs: -1 };
    for (let author of Object.keys(authorCounts)) {
        if (authorCounts[author] > mostVotedAuthor.blogs) {
            mostVotedAuthor = {
                author: author,
                blogs: authorCounts[author]
            };
        }
    }
    return mostVotedAuthor;
};

const mostLikes = (blogs) => {
    if (blogs.length === 1) {
        return { author: blogs[0].author, likes: blogs[0].likes };
    }

    const user = lodash.maxBy(blogs, 'likes');
    return { author: user.author, likes: user.likes };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };