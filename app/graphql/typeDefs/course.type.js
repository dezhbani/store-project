const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { commentType } = require("./comment.type");
const { publicCategoryType, userrType } = require("./public.type");

const episodeType = new GraphQLObjectType({
    name: "episodeType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        type: {type: GraphQLString},
        time: {type: GraphQLString},
        videoAddress: {type: GraphQLString},
    }
}) 

const chapterType = new GraphQLObjectType({
    name: "chapterType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        episodes: {type: new GraphQLList(episodeType)}
    }
})

const courseType = new GraphQLObjectType({
    name: "courseType",
    fields: {
        _id: {type: GraphQLString},
        title : {type: GraphQLString},
        short_text : {type: GraphQLString},
        text : {type: GraphQLString},
        image : {type: GraphQLString},
        imageURL : {type: GraphQLString},
        tags : {type: new GraphQLList(GraphQLString)},
        category : {type: publicCategoryType},
        price : {type: GraphQLInt},
        discount : {type: GraphQLInt},
        count : {type: GraphQLInt},
        type : {type: GraphQLString},
        status : {type: GraphQLString},
        teacher : {type: userrType},
        chapters : {type: new GraphQLList(chapterType)},
        comments: {type: new GraphQLList(commentType) }
    }
})

module.exports = {
    courseType
}