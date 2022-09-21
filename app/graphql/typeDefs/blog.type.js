const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { commentType } = require("./comment.type");
const { userType, publicCategoryType } = require("./public.type");

const blogType = new GraphQLObjectType({
    name: "blogType",
    fields: {
        _id: {type: GraphQLString},
        author : {type: userType},
        title : {type: GraphQLString},
        short_text : {type: GraphQLString},
        text : {type: GraphQLString},
        image : {type: GraphQLString},
        imageURL : {type: GraphQLString},
        tags : {type: new GraphQLList(GraphQLString)},
        category : {type: publicCategoryType },
        comments: {type: new GraphQLList(commentType)},
        likes : {type: new GraphQLList(userType)},
        bookmarks : {type: new GraphQLList(userType)}
    }
})

module.exports = {
    blogType
}