const { GraphQLString } = require("graphql");
const { productModel } = require("../../http/models/product");
const { checkToken } = require("../queries/public.resolver");
const { responseType } = require("../typeDefs/public.type");
const {StatusCodes: httpStatus} = require("http-status-codes");
const createHttpError = require("http-errors");
const { courseModel } = require("../../http/models/course");
const { blogModel } = require("../../http/models/blogs");

const bookmarkProduct = {
    type: responseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const user = await checkToken(context);
        const { productID } = args;
        await checkExist(productModel, productID, "محصولی");
        const bookmark = await productModel.findOne({_id: productID, bookmarks: user._id});
        const updateQuery = bookmark? {$pull: {bookmarks: user._id}}: {$push: {bookmarks: user._id}}
        await productModel.updateOne({_id: productID}, updateQuery);
        const message = !bookmark? "محصول به لیست علاقه مندی ها اضافه شد": "محصول از لیست علاقه مندی ها حذف شد"
        return  {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
}
const bookmarkCourse = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const user = await checkToken(context);
        const { courseID } = args;
        await checkExist(courseModel, courseID, "دوره ای");
        const bookmark = await courseModel.findOne({_id: courseID, bookmarks: user._id});
        const updateQuery = bookmark? {$pull: {bookmarks: user._id}}: {$push: {bookmarks: user._id}}
        await courseModel.updateOne({_id: courseID}, updateQuery);
        const message = !bookmark? "دوره به لیست علاقه مندی ها اضافه شد": "دوره از لیست علاقه مندی ها حذف شد"
        return  {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
}
const bookmarkBlog = {
    type: responseType,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const user = await checkToken(context);
        const { blogID } = args;
        await checkExist(blogModel, blogID, "بلاگی");
        const bookmark = await blogModel.findOne({_id: blogID, bookmarks: user._id});
        console.log(bookmark)
        const updateQuery = bookmark? {$pull: {bookmarks: user._id}}: {$push: {bookmarks: user._id}}
        await blogModel.updateOne({_id: blogID}, updateQuery);
        const message = !bookmark? "بلاگ به لیست علاقه مندی ها اضافه شد": "بلاگ از لیست علاقه مندی ها حذف شد"
        return  {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
}

async function checkExist(model, id, message){
    const find = await model.findById(id);
    if(!find) throw createHttpError.NotFound(`${message} یافت نشد`)
}

module.exports = {
    bookmarkProduct,
    bookmarkCourse,
    bookmarkBlog
}