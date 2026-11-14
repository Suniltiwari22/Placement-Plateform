import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
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

        logo: {
            type: String,
            default: ""
        },

        type: {
            type: String,
            enum: ["service", "product", "startup", "other"],
            default: "other"
        },

        description: {
            type: String,
            default: ""
        },

        website: {
            type: String,
            default: ""
        },

        hiringProcess: {
            type: [String],
            default: []
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Company = mongoose.model("Company", companySchema);

export default Company;