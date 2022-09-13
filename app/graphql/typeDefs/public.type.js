const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");

const athorType = new GraphQLObjectType({
    name: "athorType",
    fields: {
        _id : {type: GraphQLString},
        first_name : {type: GraphQLString},
        last_name : {type: GraphQLString}
    }
})
const publicCategoryType = new GraphQLObjectType({
    name: "publicCategoryType",
    fields: {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
    }
})
const detailsType = new GraphQLObjectType({
    name: "detailsType",
    fields: {
            length: {type: GraphQLInt},
            weight: {type: GraphQLInt},
            hight: {type: GraphQLInt},
            width: {type: GraphQLInt},
            colors: {type: new GraphQLList(GraphQLString)},
    }
})
module.exports = {
    athorType,
    publicCategoryType,
    detailsType
}