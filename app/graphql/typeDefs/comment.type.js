const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { userType } = require("./public.type");
const CommentAnswerType = new GraphQLObjectType({
    name: "CommentAnswerType",
    fields:{
        _id: {type: GraphQLString},
        user: {type: userType},
        comment: {type: GraphQLString},
        createdAt: {type: GraphQLString},

    }
})

const commentType = new GraphQLObjectType({
    name: "commentType",
    fields:{
        _id: {type: GraphQLString},
        user: {type: userType},
        comment: {type: GraphQLString},
        answer: {type: new GraphQLList(CommentAnswerType)},
        show: {type: GraphQLBoolean},
        openToComment: {type: GraphQLBoolean},
        createdAt: {type: GraphQLString}
    }
})

module.exports = {
    commentType
}