const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = require("graphql");
const { blogResolver } = require("./queries/blog.resolver");
const { productResolver } = require("./queries/product.resolver");

const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        blogs: blogResolver,
        products: productResolver
    }
}); 
const rootMutation = new GraphQLObjectType({
    name: "rootMutation",
    fields: {
        
    }
});
const graphqlSchema = new GraphQLSchema({
    query: rootQuery,
    // mutation: rootMutation
}) 

module.exports = {
    graphqlSchema
}