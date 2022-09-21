const { GraphQLList, GraphQLString } = require("graphql");
const { blogModel } = require("../../http/models/blogs");
const { blogType } = require("../typeDefs/blog.type");

const blogResolver = {
    type: new GraphQLList(blogType),
    args: {
        category: {type: GraphQLString}
    },
    resolve: async (_, args) => {
        const {category} = args;
        const findQuery = category? {category}: {}
        return await blogModel.find(findQuery).populate([
            {path: "author"},
            {path: "category"}, 
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path: "likes"},
            {path: "bookmarks"},
        ])
    }
}

module.exports = {
    blogResolver
}