const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce((sum, post) => sum + (post.likes || 0), 0);
    return totalLikes;
}

const favoriteBlog = (blogs) => {
    const favoriteBlog = blogs.reduce((largest, post) => post.likes > largest ? post.likes : largest, 0);
    return favoriteBlog;
}
  
module.exports = {
    totalLikes,
    favoriteBlog
}