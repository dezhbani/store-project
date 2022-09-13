const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString } = require("graphql");
const { publicCategoryType, detailsType, athorType } = require("./public.type");

const productType = new GraphQLObjectType({
    name: "productType",
    fields: {
        _id: {type: GraphQLString},
        supplier : {type: athorType},
        title : {type: GraphQLString},
        short_text : {type: GraphQLString},
        text : {type: GraphQLString},
        images : {type: new GraphQLList(GraphQLString)},
        imagesURL : {type: new GraphQLList(GraphQLString)},
        imageURL : {type: GraphQLString},
        tags : {type: GraphQLString},
        category : {type: publicCategoryType},
        price : {type: GraphQLInt},
        discount : {type: GraphQLInt},
        count : {type: GraphQLInt},
        type : {type: GraphQLString}, // virtual - phisical
        details : {type: detailsType}
    }
})

module.exports = {
    productType
}