const createHttpError = require("http-errors");
const { PERMISSIONS } = require("../../utils/constant");
const { permissionModel } = require("../models/permission");
const { roleModel } = require("../models/role");

function checkPermission(requiredPermission) {
    return async function (req, res, next) {
        try {
            console.log(requiredPermission)
            const user = req.user;
            const role = await roleModel.findOne({title: user.role});
            const permissions = await permissionModel.find({_id: {$in: role.permission}});
            const userPermissions = permissions.map(item => item.name);
            const hasPermission = requiredPermission.every(permission => {
                return userPermissions.includes(permission)
            })
            if(userPermissions.includes(PERMISSIONS.ALL)) return next();
            if(requiredPermission.length == 0 || hasPermission) return next();
            throw createHttpError.Forbidden("شما به این قسمت دسترسی ندارید");
        } catch (error) {
            next(error)
        }
    }
}

module.exports= {
    checkPermission
}