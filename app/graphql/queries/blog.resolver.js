const { GraphQLList } = require("graphql");
const { blogModel } = require("../../http/models/blogs");
const { blogType } = require("../typeDefs/blog.type");

const blogResolver = {
    type: new GraphQLList(blogType),
    resolve: async () => {
        return await blogModel.find({}).populate([{path: "author"}, {path: "category"}])
    }
}

module.exports = {
    blogResolver
}