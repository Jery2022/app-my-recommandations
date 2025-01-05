import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const bcrypt = bcryptjs;

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'member', 'guest'],
        default: 'guest' // Par défaut, un utilisateur est un invité admin
    },
    actif: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hachage du mot de passe avant de sauvegarder l'utilisateur 
UserSchema.pre('save', async function(next) { 
    if (this.isModified('password') || this.isNew) { 
        this.password = await bcrypt.hash(this.password, 10); 
    } next(); 
});

export default model('User', UserSchema);
