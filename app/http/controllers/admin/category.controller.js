const createHttpError = require("http-errors");
const { catergoryModel } = require("../../models/categories");
const { addCategorySchema } = require("../../validations/admin/category.schema");
const Controllers = require("../controllers");
class CatergoryController {
    async addCategory(req, res, next){
        try {
            await addCategorySchema.validateAsync(req.body);
            const {title, parent} = req.body;
            const category = await catergoryModel.create({title, parent});
            if(!category) throw createHttpError.InternalServerError("خطای داخلی");
            return res.status(201).json({
                data:{
                    statusCode: 201,
                    message: "دسته بندی ثبت شد"
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
    removeCategory(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    getAllCategory(req, res, next){
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
    geAlltHeads(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    CategoryController: new CatergoryController()
}