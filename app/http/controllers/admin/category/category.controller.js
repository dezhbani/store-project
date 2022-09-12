const createHttpError = require("http-errors");
const { categoryModel } = require("../../../models/categories");
const { addCategorySchema, editCategorySchema } = require("../../../validations/admin/category.schema");
const { Controllers } = require("../../controllers");
const mongoose = require("mongoose");

class CatergoryController extends Controllers {
    async addCategory(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body);
            const { title, parents } = req.body;
            const category = await categoryModel.create({ title, parent: parents });
            if (!category) throw createHttpError.InternalServerError("خطای داخلی");
            return res.status(201).json({
                statusCode: 201,
                data: {
                    message: "دسته بندی ثبت شد"
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async geAllParents(req, res, next) {
        try {
            const parent = await categoryModel.find({parent: undefined})
            return res.status(200).json({
                statusCode: 200,
                data: {
                    parent
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async geChildrenOfParents(req, res, next) {
        try {
            const { parent } = req.params;
            const children = await categoryModel.find({ parent }, { __v: 0, parent: 0 });
            if (children.length == 0) throw createHttpError.NotFound("دسته بندی مورد نظر یافت نشد")
            return res.status(200).json({
                statusCode: 200,
                data: {
                    children
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllCategory(req, res, next) {
        try {
            // const category = await categoryModel.aggregate([
            //     {
            //         $graphLookup:{
            //             from: "categories",
            //             startWith: "$_id",
            //             connectFromField: "_id",
            //             connectToField: "parent",
            //             maxDepth: 5,
            //             depthField: "depth",
            //             as: "children"
            //         }
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             "children.__v": 0,
            //             "children.parent": 0
            //         }
            //     },
            //     {
            //         $match:{
            //             parent: undefined
            //         }
            //     }
            // ])
            const categories = await categoryModel.find({ parent: undefined })
            return res.status(200).json({
                statusCode: 200,
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCategoryById(req, res, next) {
        try {
            const { id } = req.params;
            const category = await categoryModel.aggregate([
                {
                    $match: { _id: mongoose.Types.ObjectId(id) }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children",

                    }
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0
                    }
                }
            ])
            return res.status(200).json({
                statusCode: 200,
                data: {
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req, res, next) {
        try {
            const { id } = req.params;
            const category = await this.checkExistCategory(id);
            const deleteResult = await categoryModel.deleteMany({
                $or: [{ _id: category._id }, { parent: category._id }]
            });
            if (deleteResult.deletedCount == 0) throw createHttpError.InternalServerError("حذف دسته بندی انجام نشد");
            return res.status(200).json({
                statusCode: 200,
                data: {
                    message: "حذف دسته بندی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async editCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const ctegory = await this.checkExistCategory(id);
            await editCategorySchema.validateAsync(req.body);
            const resultOfUpdate = await categoryModel.updateOne({ _id: id }, { $set: { title } });
            if (resultOfUpdate.modifiedCount == 0) throw createHttpError.InternalServerError("به روزرسانی انجام نشد");
            return res.status(200).json({
                statusCode: 200,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async checkExistCategory(id) {
        const category = await categoryModel.findById(id);
        if (!category) throw createHttpError.NotFound("دسته بندی یافت نشد");
        return category;
    }

}

module.exports = {
    CategoryController: new CatergoryController()
}