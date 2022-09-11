const { graphqlSchema } = require("../index.resolver.js");

function graphqlConfig(req, res){
    return {
        schema: graphqlSchema,
        graphiql: true,
        context: {req, res}
    }
}

module.exports = { 
    graphqlConfig
}