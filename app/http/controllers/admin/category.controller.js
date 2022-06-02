const createHttpError = require("http-errors");
const { catergoryModel } = require("../../models/categories");
const { addCategorySchema } = require("../../validations/admin/category.schema");
const {Controllers} = require("../controllers");
class CatergoryController extends Controllers{
    async addCategory(req, res, next){
        try {
            await addCategorySchema.validateAsync(req.body);
            const {title, parents} = req.body;
            const category = await catergoryModel.create({title, parent: parents});
            if(!category) throw createHttpError.InternalServerError("خطای داخلی");
            return res.status(201).json({
                data:{
                    statusCode: 201,
                    message: "دسته بندی ثبت شد"
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async geAllParents(req, res, next){
        try {
            const parent = await catergoryModel.find({parent: undefined}, {__v: 0})
            return res.status(200).json({
                data:{
                    statusCode:200,
                    parent
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async geChildrenOfParents(req, res, next){
        try {
            const {parent} = req.params;
            const children = await catergoryModel.find({parent}, {__v:0, parent:0});
            return res.status(200).json({
                data:{
                    statusCode:200,
                    children
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllCategory(req, res, next){
        try {
            const category = await catergoryModel.aggregate([
                {
                    $lookup:{
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children"
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
                data: {
                    statusCode:200,
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req, res, next){
        try {
            const {id} = req.params;
            const category = await this.checkExistCategory(id);
            const deleteResult = await catergoryModel.deleteOne({_id: category._id});
            if(deleteResult.deletedCount == 0) throw createHttpError.InternalServerError("حذف دسته بندی انجام نشد");
            return res.status(200).json({
                data:{
                    statusCode:200,
                    message: "حذف دسته بندی  با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    editCategory(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
  
    getCategoryById(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async checkExistCategory(id){
        const category = await catergoryModel.findById(id);
        if(!category) throw createHttpError.NotFound("دسته بندی یافت نشد");
        return category;
    }

}

module.exports = {
    CategoryController: new CatergoryController()
}