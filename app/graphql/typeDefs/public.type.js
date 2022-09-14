const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLScalarType } = require("graphql");
const { toObject, parseLiteral } = require("../utils/functions");

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
        title : {type : GraphQLString}
    }
})
const detailsType = new GraphQLObjectType({
    name: "detailsType",
    fields: {
            length: {type: GraphQLInt},
            weight: {type: GraphQLInt},
            hight: {type: GraphQLInt},
            width: {type: GraphQLInt},
            colors: {type: new GraphQLList(GraphQLString)}
    }
})

const anyType = new GraphQLScalarType({
    name: "anyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral 
})

module.exports = {
    athorType,
    publicCategoryType,
    detailsType,
    anyType
}