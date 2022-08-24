const model = require('./user.model')

module.exports = {
    GET: async(req, res) => {
        try {
            const users = await model.allUser()
            return res.json(users)
        } catch (err) {
            console.log(err);
        }
    },

    GET_USER: async(req, res) => {
        try {
            const { id } = req.params;
            const user = await model.anUser(id)
            return res.json(user)
        } catch (err) {
            console.log(err);
        }
    },

    POST: async(req, res) => {
        try {
            const { name, gender, email, password } = req.body
            const user = await model.addUser(name, gender, email, password)
            return res.json({
                message: 'You have been registered',
                data: user
            })
        } catch (err) {
            console.log(err);
        }
    },
    
    PUT: async(req, res) => {
        try {
            const { name, gender, email, password } = req.body
            const { id } = req.params;
            const user = await model.updateUser(name, gender, email, password, id)
            return res.status(201).json({
                message: 'Profile has been updated',
                data: user
            })
            
        } catch (err) {
            console.log(err);
        }
    },

    DELETE: async(req, res) => {
        try {
            const { id } = req.params
            const user = await model.removeUser(id)
            return res.json({
                message: 'Profile has been deleted',
                data: user
            })
            
        } catch (err) {
            console.log(err);
        }
    }
}