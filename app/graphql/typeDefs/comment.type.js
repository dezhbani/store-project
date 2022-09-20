const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { userrType } = require("./public.type");
const CommentAnswerType = new GraphQLObjectType({
    name: "CommentAnswerType",
    fields:{
        _id: {type: GraphQLString},
        user: {type: userrType},
        comment: {type: GraphQLString},
        createdAt: {type: GraphQLString},

    }
})

const commentType = new GraphQLObjectType({
    name: "commentType",
    fields:{
        _id: {type: GraphQLString},
        user: {type: userrType},
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