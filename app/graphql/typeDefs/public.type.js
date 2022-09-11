const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");

const athorType = new GraphQLObjectType({
    name: "athorType",
    fields: {
        _id : {type: GraphQLString},
        first_name : {type: GraphQLString},
        last_name : {type: GraphQLString}
    }
})
const categoryType = new GraphQLObjectType({
    name: "categoryType",
    fields: {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
    }
})

module.exports = {
    athorType,
    categoryType
}