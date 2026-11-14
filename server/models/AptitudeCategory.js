
import mongoose from "mongoose";

const aptitudeCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        description: {
            type: String,
            default: ""
        },
        icon: {
            type: String,
            default: ""
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const AptitudeCategory = mongoose.model(
    "AptitudeCategory",
    aptitudeCategorySchema
);

export default AptitudeCategory;
