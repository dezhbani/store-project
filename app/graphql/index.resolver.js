const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = require("graphql");
const { blogResolver } = require("./queries/blog.resolver");
const { categoryResolver, categoryChildResolver } = require("./queries/category.resolver");
const { courseResolver } = require("./queries/course.resolver");
const { productResolver } = require("./queries/product.resolver");
const { createCommentForBlog, createCommentForCourse, createCommentForProducts } = require("./mutations/comment.resolver");
const { likeProduct, likeCourse, likeBlog } = require("./mutations/likes.resolver");
const { bookmarkProduct, bookmarkCourse, bookmarkBlog } = require("./mutations/bookmarks.resolver");

const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        blogs: blogResolver,
        products: productResolver,
        categories: categoryResolver,
        childOfCategory: categoryChildResolver,
        courses: courseResolver,

    }
}); 
const rootMutation = new GraphQLObjectType({
    name: "rootMutation",
    fields: {
        createCommentForBlog,
        createCommentForCourse,
        createCommentForProducts,
        likeProduct,
        likeCourse,
        likeBlog,
        bookmarkProduct,
        bookmarkCourse,
        bookmarkBlog
    }
});
const graphqlSchema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
}) 

module.exports = {
    graphqlSchema
}