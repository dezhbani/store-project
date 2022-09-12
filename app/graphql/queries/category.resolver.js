const { GraphQLList } = require("graphql");
const { categoryModel } = require("../../http/models/categories");
const { productModel } = require("../../http/models/product");
const { categoryType } = require("../typeDefs/category.type");

const categoryResolver = {
    type: new GraphQLList(categoryType),
    resolve: async () => {
        const categories = await categoryModel.find({parent: undefined})
        return categories
    }
}

module.exports = {
    categoryResolver
}