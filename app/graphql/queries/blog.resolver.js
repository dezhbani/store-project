const { GraphQLList } = require("graphql");
const { blogModel } = require("../../http/models/blogs");
const { blogType } = require("../typeDefs/blog.type");

const blogResolver = {
    type: new GraphQLList(blogType),
    resolve: async () => {
        const blogs = await blogModel.find({}).populate([{path: "author"}, {path: "category"}])
        console.log(blogs)
        return blogs
    }
}

module.exports = {
    blogResolver
}