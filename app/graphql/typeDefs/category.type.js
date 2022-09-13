const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { publicCategoryType } = require("./public.type");

const categoryType = new GraphQLObjectType({
    name: "categoryType",
    fields: {
        _id: {type: GraphQLString},
        title : {type: GraphQLString},
        children: {type: new GraphQLList(publicCategoryType)}
    }
})

module.exports = {
    categoryType
}