const { GraphQLList } = require("graphql");
const { productModel } = require("../../http/models/product");
const { productType } = require("../typeDefs/product.type");

const productResolver = {
    type: new GraphQLList(productType),
    resolve: async () => {
        return await productModel.find({}).populate([{path:"category"}, {path:"supplier"}])
    }
}

module.exports = {
    productResolver
}