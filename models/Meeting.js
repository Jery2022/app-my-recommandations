import { Schema, model } from 'mongoose';

const MeetingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export default model('Meeting', MeetingSchema);
