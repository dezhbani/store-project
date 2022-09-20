const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLScalarType } = require("graphql");
const { toObject, parseLiteral } = require("../utils/functions");

const userrType = new GraphQLObjectType({
    name: "userrType",
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


const responseType = new GraphQLObjectType({
    name: "responseType",
    fields:{
        statusCode: {type: GraphQLString},
        data:{type: anyType}
    }
})

module.exports = {
    userrType,
    publicCategoryType,
    detailsType,
    anyType,
    responseType
}