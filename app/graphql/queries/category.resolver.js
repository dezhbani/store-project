const { GraphQLList, GraphQLString } = require("graphql");
const { verifyTokenInGraphql } = require("../../http/middlewares/verifyAccessToken");
const { categoryModel } = require("../../http/models/categories");
const { categoryType } = require("../typeDefs/category.type");
const { checkToken } = require("./public.resolver");

const categoryResolver = {
    type: new GraphQLList(categoryType),
    resolve: async (_, args, context) => {
        await checkToken(context)
        const categories = await categoryModel.find({parent: undefined})
        return categories
    }
}
const categoryChildResolver = {
    type: new GraphQLList(categoryType),
    args: {
        parent: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { parent } = args;
        await checkToken(context)
        const categories = await categoryModel.find({parent})
        return categories
    }
}

module.exports = {
    categoryResolver,
    categoryChildResolver
}