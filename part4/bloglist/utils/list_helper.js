const _ = require('lodash')
const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce((sum, post) => sum + (post.likes || 0), 0);
    return totalLikes;
}

const favoriteBlog = (blogs) => {
    const favoriteBlog = blogs.reduce((largest, post) => post.likes > largest ? post.likes : largest, 0);
    return favoriteBlog;
}

const mostBlogs = (blogs) => {
    const blogCounts = _.countBy(blogs, 'author');
    const topAuthor = _.maxBy(_.keys(blogCounts), (author) => blogCounts[author])
    const maxBlogs = blogCounts[topAuthor]
    return { author: topAuthor, blogs: maxBlogs }
}
module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs
}