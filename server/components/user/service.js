const User = require('./model') 

module.exports = {

    get: async (email) => {
        return await User.findOne({ email: email })
    }, 

    create: async (user) => {
        const newUser = new User(user)
        return await newUser.save()
    },

    update: async (user) => {
        return await User.findByIdAndUpdate(user._id, user, { new: true})
    }, 

    delete: async (id) => {
        return await User.findByIdAndDelete(id)
    }
}