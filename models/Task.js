import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['annulé','en attente', 'en cours', 'terminée'],
        default: 'en attente'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recommendation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recommendation'
    }
});

export default model('Task', TaskSchema);