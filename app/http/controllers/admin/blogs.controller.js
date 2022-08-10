const { blogModel } = require("../../models/blogs");
const { createBlogSchema } = require("../../validations/admin/blog.schema");
const { Controllers } = require("../controllers");
const path = require("path");
const { deleteFileInPublic } = require("../../../utils/function");
const createHttpError = require("http-errors");
class BlogController extends Controllers {
    async createBlog(req, res, next) {
        try {
            // console.log(req.body)
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename);
            req.body.image = req.body.image.replace(/\\/g, "/");
            const { text, short_text, category, title, tags } = blogDataBody;
            const image = req.body.image;
            const author = req.user._id;
            console.log(path.join(__dirname, image))
            const blog = await blogModel.create({ text, image, short_text, category, title, tags, author })
            return res.status(201).json({
                statusCode: 201,
                data: {
                    message: "بلاگ با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }
    async getBlogByID(req, res, next) {
        try {
            const { id } = req.params;
            const blog = await this.findBlog(id);
            return res.status(200).json({
                statusCode: 200,
                data: {
                    blog
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async deletBlogByID(req, res, next) {
        try {
            const { id } = req.params;
            await this.findBlog(id);
            const result = await blogModel.deleteOne({ _id: id });
            if (result.deletedCount == 0) throw createHttpError.InternalServerError("مقاله حذف نشد");
            res.status(200).json({
                statusCode: 200,
                data: {
                    message: "حذف مقاله با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfBlogs(req, res, next) {
        try {
            const blogs = await blogModel.aggregate([
                { $match: {} },
                {
                    $lookup: {
                        from: "users",
                        foreignField: "_id",
                        localField: "author",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $lookup: {
                        from: "categories",
                        foreignField: "_id",
                        localField: "category",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $project: {
                        "author.__v": 0,
                        "category.__v": 0,
                        "author.otp": 0,
                        "author.roles": 0,
                        "author.discuont": 0,
                        "author.bills": 0
                    }
                }
            ]);
            return res.status(200).json({
                statusCode: 200,
                data: {
                    blogs,
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBlogByID(req, res, next) {
        try {
            const { id } = req.params;
            await this.findBlog(id);
            const data = req.body;
            if (data?.fileUploadPath && data?.filename) {
                req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
                req.body.image = req.body.image.replace(/\\/g, "/");
            }
            let nullishData = ["", " ", "0", 0, null, undefined];
            let blackListFields = ["bookmark", "like", "dislike", "comments"];
            Object.keys(data).forEach(key => {
                if (blackListFields.includes(data[key])) delete data[key];
                if (typeof data[key] === "string") data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
                if (nullishData.includes(data[key])) delete data[key];
            })
            const updateResult = await blogModel.updateOne({ _id: id }, { $set: data });
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("به روز رسانی انجام نشد");

            return res.status(200).json({
                statusCode: 200,
                data: {
                    message: "به روز رسانی بلاگ با موفقیت انجام شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req?.body?.image)
            next(error)
        }
    }
    async getCommetsOfBlog(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }


    async findBlog(id) {
        const blog = await blogModel.findById(id).populate([{ path: "category", select: ['title'] }, { path: "author", select: ["first_name", "last_name", "mobile", "username"] }]);
        if (!blog) throw createHttpError.NotFound("مقاله ای یافت نشد");
        return blog;
    }

}

module.exports = {
    adminBlogController: new BlogController()
}