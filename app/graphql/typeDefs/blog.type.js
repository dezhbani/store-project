const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { commentType } = require("./comment.type");
const { userrType, publicCategoryType } = require("./public.type");

const blogType = new GraphQLObjectType({
    name: "blogType",
    fields: {
        _id: {type: GraphQLString},
        author : {type: userrType},
        title : {type: GraphQLString},
        short_text : {type: GraphQLString},
        text : {type: GraphQLString},
        image : {type: GraphQLString},
        imageURL : {type: GraphQLString},
        tags : {type: new GraphQLList(GraphQLString)},
        category : {type: publicCategoryType },
        comments: {type: new GraphQLList(commentType) }
    }
})

module.exports = {
    blogType
}