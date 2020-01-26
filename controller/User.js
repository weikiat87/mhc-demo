var UserController = require('../model/User');


const userController = {
    findUser: () => {
        return new Promise((resolve, reject) => {
            UserController.find({}, (err, result) => {
                if (err) reject(err);
                else resolve(result)
            })
        })
    }

}


module.exports = userController