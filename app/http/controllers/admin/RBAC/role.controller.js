const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { roleModel } = require("../../../models/role");
const { addRoleSchema } = require("../../../validations/admin/RBAC.schema");
const { Controllers } = require("../../controllers");

class RoleController extends Controllers{
    async addRole(req, res, next){
        try {
            const {title, permission} = await addRoleSchema.validateAsync(req.body);
            await this.findRoleByTitle(title);
            const createRole = await roleModel.create({title, permission});
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