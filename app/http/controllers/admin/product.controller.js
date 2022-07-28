const createHttpError = require("http-errors");
const {Controllers} = require("../controllers");
const {createProductSchema } = require("../../validations/admin/product.schema");
const mongoose = require("mongoose");
const { deleteFileInPublic, listOfImages } = require("../../../utils/function");
const { productModel } = require("../../models/product");
const path = require("path");
const { IDvalidator } = require("../../validations/public.schema");
const {StatusCodes:httpStatus} = require("http-status-codes");
class ProductController extends Controllers{
    async addProduct(req, res, next){
        try {
            // return console.log( req.body)
            const images = listOfImages(req?.files || [], req.body.fileUploadPath);
            const productBody = await createProductSchema.validateAsync(req.body);
            const { type, discount, width, length, height, price, text, count, short_text, title, weight, tags, category} = productBody;
            const supplier = req.user._id;
            let details = {
                width: 0, 
                height: 0,
                weight: 0,
                length: 0
            }
            if(type === "virtual" && width === '' && height === '' && weight === ''&& length === ''){
                details = details 
            }else if(type === "phisical" &&  width !== '' && height !== '' && weight !== ''&& length !== '' ){
                if (width) details.width = width;
                if (height) details.height = height;
                if (weight) details.weight = weight;
                if (length) details.length = length;
            }
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