import { Schema, model } from 'mongoose';

const RecommendationSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    meeting: {
        type: Schema.Types.ObjectId,
        ref: 'Meeting',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['annulé','en attente', 'en cours', 'terminée'],
        default: 'en attente'
    }
});

export default model('Recommendation', RecommendationSchema);
