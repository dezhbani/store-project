const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = require("graphql");
const { blogResolver } = require("./queries/blog.resolver");

const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        blogs: blogResolver
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