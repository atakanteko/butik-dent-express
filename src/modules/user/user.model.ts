import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    passwordHash: {
        type: String,
        required: [true, 'password is required']
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
},{ timestamps: true })


const User = mongoose.model('User', userSchema)

export default User