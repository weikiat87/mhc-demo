var UserModel = require('../model/User');

const UserController = {
    findUsers: () => {
        return new Promise((resolve, reject) => {
            UserModel.User.find()
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    },
    findVendors: () => {
        return new Promise((resolve, reject) => {
            UserModel.VendorUser.find()
            .then(result=> resolve(result))
            .catch(err => reject(err))
        })
    },
    findAdmins: () => {
        return new Promise((resolve, reject) => {
            UserModel.AdminUser.find()
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

}


module.exports = UserController