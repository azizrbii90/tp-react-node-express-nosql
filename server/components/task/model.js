const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        max: 300,
        required: false
    },

    finished: {
        type: Boolean,
        default: false
    },

    finished_at:{
        type: Date
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,   
        required: true,
        ref: 'User'
    }
    
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;