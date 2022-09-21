const { GraphQLList } = require("graphql");
const { blogModel } = require("../../http/models/blogs");
const { courseModel } = require("../../http/models/course");
const { productModel } = require("../../http/models/product");
const { blogType } = require("../typeDefs/blog.type");
const { checkToken } = require("./public.resolver");

const getBlogsBookmarks = {
    type: new GraphQLList(blogType),
    resolve: async (_, args, context) => {
        const user = await checkToken(context);
        const blogs = await blogModel.find({bookmarks: user._id}).populate([
            {path: "author"},
            {path: "category"}, 
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path: "likes"},
            {path: "bookmarks"},
        ])
        return blogs
    }
}
const getProductsBookmarks = {
    type: new GraphQLList(blogType),
    resolve: async (_, args, context) => {
        const user = await checkToken(context);
        const products = await productModel.find({bookmarks: user._id}).populate([
            {path:"category"}, 
            {path:"supplier"}, 
            {path: "comments.user"}, 
            {path: "comments.answers.user"},
            {path: "likes"},
            {path: "bookmarks"},
        ])
        return products
    }
}
const getCoursesBookmarks = {
    type: new GraphQLList(blogType),
    resolve: async (_, args, context) => {
        const user = await checkToken(context);
        const courses = await courseModel.find({bookmarks: user._id}).populate([
            {path:"teacher"},
            {path:"category"},
            {path: "comments.user"}, 
            {path: "comments.answers.user"},
            {path: "likes"},
            {path: "bookmarks"},
            ])
        return courses
    }
}

module.exports = {
    getBlogsBookmarks,
    getProductsBookmarks,
    getCoursesBookmarks
}