const { GraphQLList } = require("graphql");
const { courseModel } = require("../../http/models/course");
const { productModel } = require("../../http/models/product");
const { courseType } = require("../typeDefs/course.type");
const { productType } = require("../typeDefs/product.type");

const courseResolver = {
    type: new GraphQLList(courseType),
    resolve: async () => {
        return await courseModel.find({}).populate([{path:"teacher"}, {path:"category"}])
    }
}

module.exports = {
    courseResolver
}