const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { athorType, publicCategoryType } = require("./public.type");

const blogType = new GraphQLObjectType({
    name: "blogType",
    fields: {
        _id: {type: GraphQLString},
        author : {type: athorType},
        title : {type: GraphQLString},
        short_text : {type: GraphQLString},
        text : {type: GraphQLString},
        image : {type: GraphQLString},
        imageURL : {type: GraphQLString},
        tags : {type: new GraphQLList(GraphQLString)},
        category : {type: publicCategoryType }
    }
})

module.exports = {
    blogType
}