import mongoose from "mongoose";

const AnalysisSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: true
        },

        score: {
            type: Number,
            min: 0,
            max: 100,
            required: true
        },

        skills: {
            type: [String],
            default: []
        },

        missingSkills: {
            type: [String],
            default: []
        },

        education: {
            type: [String],
            default: []
        },

        experience: {
            type: [String],
            default: []
        },

        projects: {
            type: [String],
            default: []
        },

        certifications: {
            type: [String],
            default: []
        },

        strengths: {
            type: [String],
            default: []
        },

        weaknesses: {
            type: [String],
            default: []
        },

        suggestions: {
            type: [String],
            default: []
        },

        sections: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Analysis = mongoose.model(
    "Analysis",
    AnalysisSchema
);

export default Analysis;