const { GraphQLString } = require("graphql");
const { productModel } = require("../../http/models/product");
const { checkToken } = require("../queries/public.resolver");
const { responseType } = require("../typeDefs/public.type");
const {StatusCodes: httpStatus} = require("http-status-codes");
const createHttpError = require("http-errors");
const { courseModel } = require("../../http/models/course");
const { blogModel } = require("../../http/models/blogs");

const likeProduct = {
    type: responseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const user = await checkToken(context);
        const { productID } = args;
        await checkExist(productModel, productID, "محصولی");
        const like = await productModel.findOne({likes: user._id});
        let liked
        if(!like){
            await productModel.updateOne({_id: productID}, {
                $push: {likes: user._id}
            })
            liked = true
        }else if(like){
            await productModel.updateOne({_id: productID}, {
                $pull: {likes: user._id}
            })
            liked = false
        }
        return  {
            statusCode: httpStatus.OK,
            data: {
                liked
            }
        }
    }
}
const likeCourse = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const {req} = context;
        const user = await checkToken(context);
        const { courseID } = args;
        await checkExist(courseModel, courseID, "دوره ای")
        const like = await courseModel.findOne({ likes: user._id });
        let liked
        if(!like){
            await courseModel.updateOne({_id: courseID}, {
                $push: {likes: user._id}
            })
            liked = true
        }else if(like){
            await courseModel.updateOne({_id: courseID}, {
                $pull: {likes: user._id}
            })
            liked = false
        }
        return  {
            statusCode: httpStatus.OK,
            data: {
                liked
            }
        }
    }
}
const likeBlog = {
    type: responseType,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const user = await checkToken(context);
        const { blogID } = args;
        await checkExist(blogModel, blogID, "بلاگی");
        const like = await blogModel.findOne({_id: blogID, likes: user._id});
        let liked
        if(!like){
            await blogModel.updateOne({_id: blogID}, {
                $push: {likes: user._id}
            })
            liked = true
        }else if(like){
            await blogModel.updateOne({_id: blogID}, {
                $pull: {likes: user._id}
            })
            liked = false
        }
        return  {
            statusCode: httpStatus.OK,
            data: {
                liked
            }
        }
    }
}

async function checkExist(model, id, message){
    const find = await model.findById(id);
    if(!find) throw createHttpError.NotFound(`${message} یافت نشد`)
}

module.exports = {
    likeProduct,
    likeCourse,
    likeBlog
}