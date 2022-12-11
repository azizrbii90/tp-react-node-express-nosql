const Task = require('./model') 

module.exports = {

    getAll: async (idUser) => {
        return await Task.find({ user: idUser })
    },

    getById: async (id) => {
        return await Task.findById(id)
    },

    findByTitle: async (title) => {
        return await Task.findOne({ title : title })
    },

    create: async (task) => {
        const newTask = new Task(task) 
        return await newTask.save()
    }, 

    update: async (task) => {
        return await Task.findOneAndUpdate(task._id, task, { new: true})
    },

    delete: async (id) => {
        return await Task.findByIdAndDelete(id)
    }
}