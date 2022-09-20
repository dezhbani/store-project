const { GraphQLList, GraphQLString } = require("graphql");
const { courseModel } = require("../../http/models/course");
const { courseType } = require("../typeDefs/course.type");

const courseResolver = {
    type: new GraphQLList(courseType),
    args: {
        category: {type: GraphQLString}
    },
    resolve: async (_, args) => {
        const {category} = args;
        const findQuery = category? {category}: {}
        return await courseModel.find(findQuery).populate([{path:"teacher"}, {path:"category"}, {path: "comments.user"}, {path: "comments.answers.user"}])
    }
}

module.exports = {
    courseResolver
}