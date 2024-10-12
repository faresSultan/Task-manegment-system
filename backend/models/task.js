const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        unqiue: true
    },
    description: {
        type: String,
        required: true
    },
    important: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    category: [{
        type:String,
         enum: ['Unset', 'Work', 'Study', 'Self-care', 'Exercise', 'Relax'],
        default: 'Unset'
    }]
});

module.exports = mongoose.model("task", TaskSchema)