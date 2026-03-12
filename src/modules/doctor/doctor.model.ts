import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required'],
        unique: true,
    },
    specializations: [
        {
            type: String,
            required: [true, 'specializations are required'],
        }
    ],
    appointmentDuration: {
        type: Number,
        default: 30,
    },
    isActive: {
        type: Boolean,
        default: true
    }
    
},{ timestamps: true })


const Doctor = mongoose.model('Doctor', doctorSchema)

export default Doctor