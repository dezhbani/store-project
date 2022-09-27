const { GraphQLString, GraphQLInt } = require("graphql");
const { productModel } = require("../../http/models/product");
const { checkToken } = require("../queries/public.resolver");
const { responseType } = require("../typeDefs/public.type");
const {StatusCodes: httpStatus} = require("http-status-codes");
const createHttpError = require("http-errors");
const { courseModel } = require("../../http/models/course");
const { blogModel } = require("../../http/models/blogs");
const { userModel } = require("../../http/models/user");
const { copyObject } = require("../../utils/function");

const addProduct = {
    type: responseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const user = await checkToken(context);
        const { productID } = args;
        await checkExist(productModel, productID, "محصولی");
        const product = await findProductInBasket(user._id, productID);
        console.log(!!product)
        if(product){
            await userModel.updateOne(
                {
                    _id:user._id,
                    "basket.products.productID": productID
                },
                {
                    $inc: {
                        "basket.products.$.count": 1
                    }
                }
            )
        }else{
            await userModel.updateOne(
                {
                    _id:user._id
                },
                {
                    $push: {
                        "basket.products": {
                            productID,
                            count:1
                        }
                    }
                }
            )
        }
        return {
            statusCode: httpStatus.OK,
            data:{
                message: "محصول به سبد خرید اضافه شد"
            }
        }
    }
}
const addCourse = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const user = await checkToken(context);
        const { courseID } = args;
        await checkExist(courseModel, courseID, "دوره ای");
        const course = await findCourseInBasket(user._id, courseID);
        if(course){
            await userModel.updateOne(
                {
                    _id:user._id,
                    "basket.courses.courseID": courseID
                },
                {
                    $inc: {
                        "basket.courses.$.count": 1
                    }
                }
            )
        }else{
            await userModel.updateOne(
                {
                    _id:user._id
                },
                {
                    $push: {
                        "basket.courses": {
                            courseID,
                            count:1
                        }
                    }
                }
            )
        }
        return {
            statusCode: httpStatus.OK,
            data:{
                message: "دوره به سبد خرید اضافه شد"
            }
        }
    }
}
const removeCourse = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const user = await checkToken(context);
        const { courseID } = args;
        await checkExist(courseModel, courseID, "دوره ای");
    }
}
const removeProduct = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const user = await checkToken(context);
        const { courseID } = args;
        await checkExist(courseModel, courseID, "دوره ای");
    }
}

async function checkExist(model, id, message){
    const find = await model.findById(id);
    if(!find) throw createHttpError.NotFound(`${message} یافت نشد`)
}

async function findProductInBasket(userID, productID){
    console.log(userID, productID)
    const basketProduct = await userModel.findOne({_id: userID, "basket.products.productID": productID});
    const product = copyObject(basketProduct);
    return product?.basket?.products?.[0]
}

async function findCourseInBasket(userID, courseID){
    const basketCourse = await userModel.findOne({_id: userID, "basket.courses.courseID": courseID});
    const course = copyObject(basketCourse);
    return course?.basket?.courses?.[0]
}

module.exports = {
    addProduct,
    addCourse,
    removeCourse,
    removeProduct
}