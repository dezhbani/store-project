const createHttpError = require("http-errors");
const {Controllers} = require("../controllers");
const {createProductSchema } = require("../../validations/admin/product.schema");
const { deleteFileInPublic, listOfImages, copyObject, strToArray, setDetails, deleteInvalidProperties } = require("../../../utils/function");
const { productModel } = require("../../models/product");
const { IDvalidator } = require("../../validations/public.schema");
const {StatusCodes:httpStatus} = require("http-status-codes");

const productBlackList = {
    BOOKMARK: "bookmark",
    LIKE: "like", 
    DISLIKE: "dislike", 
    COMMENTS: "comments", 
    SUPPLIER: "supplier", 
    WIDTH: "width", 
    LENGTH: "length", 
    WEIGHT: "weight", 
    HEIGHT: "height", 
    COLORS: "colors"
}
Object.freeze(productBlackList);
class ProductController extends Controllers{
    async addProduct(req, res, next){
        try {
            const images = listOfImages(req?.files || [], req.body.fileUploadPath);
            const productBody = await createProductSchema.validateAsync(req.body);
            const { type, discount, price, text, count, short_text, title, tags, category} = productBody;
            const supplier = req.user._id;
            const details = setDetails(req.body)
            await productModel.create({text, short_text, category, title, tags, count, price, discount, type, images, details, supplier})
            return res.status(httpStatus.CREATED).json({
                data: {
                    statusCode: httpStatus.CREATED,
                    message: "ثبت محصول با موفقیت انجام شد"
                }
            })

        } catch (error) {
            deleteFileInPublic(req.body.image)
            console.log(error)
            next(error)
        }
    }
    async getProductByID(req, res, next){
        try {
            const {id} = req.params;
            const product = await this.findProductByID(id);
            return res.status(httpStatus.OK).json({
                data: {
                    statusCode: httpStatus.OK,
                    product
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async removeProduct(req, res, next){
        try {
            const {id} = req.params;
            await this.findProductByID(id);
            const result = await productModel.deleteOne({_id: id});
            if(result.deletedCount == 0) throw createHttpError.InternalServerError("محصول حذف نشد")
            return res.status(httpStatus.OK).json({
                data: {
                    statusCode: httpStatus.OK,
                    message: "محصول با موفقیت حذف شد"
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async searchProduct(req, res, next){
        try {
            const search = req?.query?.search || "";
            if(search) {
                const products = await productModel.find({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                })
            }else {
                products = await productModel.find({})
            }
            return res.status(httpStatus.OK).json({
                data: {
                    statusCode: httpStatus.OK,
                    products
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async editProduct(req, res, next){
        try {
            const { id } = req.params;
            const product = await this.findProductByID(id);
            const data = copyObject(req.body);
            data.image = listOfImages(req?.files || [], req.body.fileUploadPath); 
            let blackListFields = Object.values(productBlackList)
            data.details = setDetails(req.body);
            deleteInvalidProperties(data, blackListFields);
            const updateResult = await productModel.updateOne({_id: product.id}, {$set: data});
            if(updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("به روز رسانی انجام نشد");
            return res.status(httpStatus.OK).json({
                data: {
                    statusCode: httpStatus.OK,
                    message: "محصول با موفقیت آپدیت شد"
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async getAllProduct(req, res, next){
        try {
           const product = await productModel.find({});
           return res.status(httpStatus.OK).json({
            data: {
                statusCode: httpStatus.OK,
                products: product
            }
           })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async findProductByID(productID){
        const {id} = await IDvalidator.validateAsync({id: productID});
        const product = await productModel.findById(id);
        if(!product) throw createHttpError.NotFound("محصولی یافت نشد");
        return product
    }
}

module.exports = {
    ProductController: new ProductController()
}