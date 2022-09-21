const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString } = require("graphql");
const { commentType } = require("./comment.type");
const { publicCategoryType, detailsType, userType } = require("./public.type");

const productType = new GraphQLObjectType({
    name: "productType",
    fields: {
        _id: {type: GraphQLString},
        supplier : {type: userType},
        title : {type: GraphQLString},
        short_text : {type: GraphQLString},
        text : {type: GraphQLString},
        images : {type: new GraphQLList(GraphQLString)},
        imagesURL : {type: new GraphQLList(GraphQLString)},
        tags : {type: new GraphQLList(GraphQLString)},
        category : {type: publicCategoryType},
        price : {type: GraphQLInt},
        discount : {type: GraphQLInt},
        count : {type: GraphQLInt},
        details : {type: detailsType},
        type : {type: GraphQLString}, // virtual - phisical
        comments: {type: new GraphQLList(commentType) }
    }
})

module.exports = {
    productType
}