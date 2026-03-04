import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [2, 'Role name must be at least 2 characters'],
        maxlength: [50, 'Role name cannot exceed 50 characters']
    },
}, { timestamps: true });

rolesSchema.index({ name: 1 });

const Role = mongoose.model('Role', rolesSchema);

export default Role;