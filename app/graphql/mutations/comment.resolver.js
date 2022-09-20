const { GraphQLString } = require("graphql");
const createHttpError = require("http-errors");
const { courseModel } = require("../../http/models/course");
const { productModel } = require("../../http/models/product");
const { blogModel } = require("../../http/models/blogs");
const { checkToken } = require("../queries/public.resolver");
const {StatusCodes: httpStatus} = require("http-status-codes");
const { responseType } = require("../typeDefs/public.type");
const { default: mongoose } = require("mongoose");
const createCommentForBlog = {
    type: responseType,
    args:{
        comment: {type: GraphQLString},
        blogID: {type: GraphQLString},
        parent: {type: GraphQLString},
    },
    resolve: async (_, args, context) => {
        const {req} = context;
        await checkToken(context)
        const user = req.user;
        const { comment, blogID, parent } = args;
        if(!mongoose.isValidObjectId(blogID)) throw createHttpError.BadGateway("شناسه بلاگ ارسال شده صحیح نمی باشد");
        await checkExistBlog(blogModel, blogID, "بلاگی");
        let commentDocument;
        if(parent){ 
            commentDocument = await getComment(blogModel, parent)
            if(commentDocument && !commentDocument?.openToComment) throw createHttpError.BadRequest("نمیتوان پاسخی ثبت کرد");
            const createAnswerResult = await blogModel.updateOne({ "comments._id": parent }, {
                $push: { "comments.$.answers": {
                    comment,
                    user: user._id,
                    show: false
                } }
            });
            if(!createAnswerResult.modifiedCount) throw createHttpError.InternalServerError("درخواست ثبت پاسخ انجام نشد");
            return {
                statusCode: httpStatus.CREATED,
                data: {
                    message: "درخواست شما برای ثبت پاسخ ارسال شد"
                }
            }
        }else{
            await blogModel.updateOne({_id: blogID}, {$push: {comments: {
                    comment, 
                    user: user._id,
                    show: false,
                    openToComment: !mongoose.isValidObjectId(parent),
            }}})
            return {
                statusCode: httpStatus.CREATED,
                data: {
                    message: "درخواست شما برای ثبت نظر ارسال شد"
                }
            }
        }
    }
}
const createCommentForCourse = {
    type: responseType,
    args:{
        comment: {type: GraphQLString},
        courseID: {type: GraphQLString},
        parent: {type: GraphQLString},
    },
    resolve: async (_, args, context) => {
        const {req} = context;
        await checkToken(context)
        const user = req.user;
        const { comment, courseID, parent } = args;
        if(!mongoose.isValidObjectId(courseID)) throw createHttpError.BadGateway("شناسه بلاگ ارسال شده صحیح نمی باشد");
        await checkExistBlog(courseModel, courseID, "دوره ای");
        let commentDocument;
        if(parent){ 
            commentDocument = await getComment(courseModel, parent)
            if(commentDocument && !commentDocument?.openToComment) throw createHttpError.BadRequest("نمیتوان پاسخی ثبت کرد");
            const createAnswerResult = await courseModel.updateOne({
                    _id: courseID,
                    "comments._id": parent
                }, {
                $push: { "comments.$.answers": {
                    comment,
                    user: user._id,
                    show: false
                } 
            }
            });
            if(!createAnswerResult.modifiedCount && !createAnswerResult.acknowledged) throw createHttpError.InternalServerError("درخواست ثبت پاسخ انجام نشد");
            return {
                statusCode: httpStatus.CREATED,
                data: {
                    message: "درخواست شما برای ثبت پاسخ ارسال شد"
                }
            }
        }else{
            const createComment = await courseModel.updateOne({_id: courseID}, {$push: {comments: {
                comment, 
                user: user._id,
                show: false,
                openToComment: !mongoose.isValidObjectId(parent),
            }}})
            if(!createComment.modifiedCount && !createComment.acknowledged) throw createHttpError.InternalServerError("درخواست ثبت نظر انجام نشد");
            return {
                statusCode: httpStatus.CREATED,
                data: {
                    message: "درخواست شما برای ثبت نظر ارسال شد"
                }
            }
        }
    }
}
const createCommentForProducts = {
    type: responseType,
    args:{
        comment: {type: GraphQLString},
        productID: {type: GraphQLString},
        parent: {type: GraphQLString},
    },
    resolve: async (_, args, context) => {
        const {req} = context;
        await checkToken(context)
        const user = req.user;
        const { comment, productID, parent } = args;
        if(!mongoose.isValidObjectId(productID)) throw createHttpError.BadGateway("شناسه محصول ارسال شده صحیح نمی باشد");
        await checkExistBlog(productModel, productID, "محصولی");
        let commentDocument;
        if(parent){ 
            commentDocument = await getComment(productModel, parent)
            if(commentDocument && !commentDocument?.openToComment) throw createHttpError.BadRequest("نمیتوان پاسخی ثبت کرد");
            const createAnswerResult = await productModel.updateOne({
                    _id: productID,
                    "comments._id": parent
                }, {
                $push: { "comments.$.answers": {
                    comment,
                    user: user._id,
                    show: false
                } 
            }
            });
            if(!createAnswerResult.modifiedCount && !createAnswerResult.acknowledged) throw createHttpError.InternalServerError("درخواست ثبت پاسخ انجام نشد");
            return {
                statusCode: httpStatus.CREATED,
                data: {
                    message: "درخواست شما برای ثبت پاسخ ارسال شد"
                }
            }
        }else{
            const createComment = await productModel.updateOne({_id: productID}, {$push: {comments: {
                comment, 
                user: user._id,
                show: false,
                openToComment: !mongoose.isValidObjectId(parent),
            }}})
            if(!createComment.modifiedCount && !createComment.acknowledged) throw createHttpError.InternalServerError("درخواست ثبت نظر انجام نشد");
            return {
                statusCode: httpStatus.CREATED,
                data: {
                    message: "درخواست شما برای ثبت نظر ارسال شد"
                }
            }
        }
    }
}

async function checkExistBlog(model, id, message){
    const find = await model.findById(id);
    if(!find) throw createHttpError.NotFound(`${message} یافت نشد`)
}

async function getComment(model, id){
    const findComment = await model.findOne({"comments._id": id}, {"comments.$": 1});
    if(!findComment?.comments?.[0]) throw createHttpError.NotFound("کامنتی یافت نشد");
    return findComment?.comments?.[0]
}

module.exports = {
    createCommentForBlog,
    createCommentForProducts,
    createCommentForCourse
}