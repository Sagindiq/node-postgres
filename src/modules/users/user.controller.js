const model = require('./user.model')
const sign = require('../../utils/JWT')
const moment = require('moment')

moment.locale('uz-latn')

module.exports = {
    GET: async(req, res) => {
        try {
            const users = await model.allUser()

            users.map(el => {
                el.posts[0].id ? el.posts.map(p => {
                    p.created_at = moment(p.created_at).format('LLLL')
                }) : null
            })

            return res.json(users)
        } catch (err) {
            console.log(err);
        }
    },

    GET_USER: async(req, res) => {
        try {
            const { id } = req.params;
            const user = await model.anUser(id)

            user.posts?.map(el => {
                el.id ? el.created_at = moment(el.created_at).format('LLLL') : null
            })

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
                access_token: sign({id: user.id}),
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