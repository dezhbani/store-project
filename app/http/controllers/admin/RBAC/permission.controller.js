const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { copyObject, deleteInvalidProperties } = require("../../../../utils/function");
const { permissionModel } = require("../../../models/permission");
const { addPermissionSchema } = require("../../../validations/admin/RBAC.schema");
const { Controllers } = require("../../controllers");

class PermissionController extends Controllers {
    async addPermission(req, res, next) {
        try {
            const { name, description } = await addPermissionSchema.validateAsync(req.body);
            await this.findPermissionByName(name);
            const createPermission = await permissionModel.create({ name, description });
            if (!createPermission) throw createHttpError.InternalServerError("سطح دسترسی ایجاد نشد");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "سطح دسترسی با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllPermission(req, res, next) {
        try {
            const permission = await permissionModel.find({});
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    permission
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async editPermission(req, res, next) {
        try {
            const { id } = req.params;
            await this.findPermissionByID(id);
            const data = copyObject(req.body);
            await this.findPermissionByName(data.name);
            deleteInvalidProperties(data, [])
            const editResult = await permissionModel.updateOne({_id: id}, {
                $set: data
            });
            if(!editResult.modifiedCount) throw createHttpError.InternalServerError("به روزرسانی دسترسی انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "دسترسی با موفقیت به روزرسانی شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async deletePermission(req, res, next) {
        try {
            const { id } = req.params;
            await this.findPermissionByID(id);
            const deleteResult = await permissionModel.deleteOne({_id: id});
            if(!deleteResult.deletedCount) throw createHttpError.InternalServerError("حذف دسترسی انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "دسترسی با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findPermissionByName(name){
        const permission = await permissionModel.findOne({name});
        if(permission) throw createHttpError.BadRequest("سطح دسترسی قبلا ثبت شده");
    }
    async findPermissionByID(id){
        const permission = await permissionModel.findOne({_id: id});
        if(!permission) throw createHttpError.BadRequest("سطح دسترسی وارد شده وجود ندارد");
    }
}

module.exports = {
    PermissionController: new PermissionController()
}