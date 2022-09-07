const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { copyObject, deleteInvalidProperties } = require("../../../../utils/function");
const { roleModel } = require("../../../models/role");
const { addRoleSchema } = require("../../../validations/admin/RBAC.schema");
const { Controllers } = require("../../controllers");

class RoleController extends Controllers{
    async addRole(req, res, next){
        try {
            const {title, permission, description} = await addRoleSchema.validateAsync(req.body);
            await this.findRoleByTitle(title);
            const createRole = await roleModel.create({title, permission, description});
            if(!createRole) throw createHttpError.InternalServerError("نقش ایجاد نشد");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "نقش با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllRole(req, res, next){
        try {
            const roles = await roleModel.find({});
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    roles
                } 
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async editRole(req, res, next){
        try {
            const { id } = req.params;
            const role = await this.findRoleByIdOrTitle(id);
            const data = copyObject(req.body);
            deleteInvalidProperties(data, [])
            const editResult = await roleModel.updateOne ({_id: role._id}, {
                $set: data
            });
            if(!editResult.modifiedCount) throw createHttpError.InternalServerError("به روزرسانی نقش انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "نقش با موفقیت به روزرسانی شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteRole(req, res, next){
        try {
            const { field } = req.params;
            const role = await this.findRoleByIdOrTitle(field);
            const deleteResult = await roleModel.deleteOne({_id: role._id});
            if(!deleteResult.deletedCount) throw createHttpError.InternalServerError("حذف نقش انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "نقش با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findRoleByTitle(title){
        const role = await roleModel.findOne({title});
        if(role) throw createHttpError.BadRequest("نقش یا رول وارد شده وجود دارد")
    }

    async findRoleByIdOrTitle(field){
        const findQuery = mongoose.isValidObjectId(field)? {_id: field}: {title: field};
        const role = await roleModel.findOne(findQuery);
        // console.log(role)
        if(!role) throw createHttpError.NotFound("نقش یا رول وارد شده یافت نشد");
        return role
    }
}

module.exports = {
    RoleController: new RoleController()
}