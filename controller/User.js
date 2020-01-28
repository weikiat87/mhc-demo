var UserModel = require('../model/User');


const UserController = {
    findUser: () => {
        return new Promise((resolve, reject) => {
            UserModel.find({}, (err, result) => {
                if (err) reject(err);
                else resolve(result)
            })
        })
    }

}


module.exports = UserController