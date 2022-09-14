const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { publicCategoryType, anyType } = require("./public.type");

const categoryType = new GraphQLObjectType({
    name: "categoryType",
    fields: {
        _id: {type: GraphQLString},
        title : {type: GraphQLString},
        children: {type: new GraphQLList(anyType)}
    }
})

module.exports = {
    categoryType
}