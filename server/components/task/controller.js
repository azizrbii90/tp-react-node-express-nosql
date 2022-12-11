const taskService = require('./service')
const userService = require('../user/service')

module.exports = {

    getAll: async (req, res) => {
        try {
            res.status(200) 
            res.json({ success: true, tasks: await taskService.getAll(req.idUser) })
        } catch (err) { 
            console.log(err)
            res.status(500)
            res.json({ success: false, message: err })
        }
    }, 

    getById: async (req, res) => {
        try {
            res.status(200)
            res.json({ success: true, task: await taskService.getById(req.params.id) })
        } catch (err) {
            console.log(err)
            res.status(500)
            res.json({ success: false, error: err })
        }
    },

    create: async (req, res) => {
        try {   
            const user = await userService.get(req.userEmail)
            req.body.user = user
            res.status(201)
            res.json({ success: true, task: await taskService.create(req.body) })
            } 
            catch (err) {
            console.log(err)
            res.status(500)
            res.json({ success: false, message: err })
        }
    },

    update: async (req, res) => {
        try {
            res.status(200)
            res.json({ success: true, task: await taskService.update(req.body) })
        } catch (err) {
            console.log(err)
            res.status(500)
            res.json({ success: false, message: err })
        }
    },

    delete: async (req, res) => {
        try {
            res.status(200)
            res.json({ success: true, task: await taskService.delete(req.params.id) })
        } catch (err) {
            console.log(err)
            res.status(500)
            res.json({ success: false, message: err })
        }
    }
}