import mongoose, { Schema } from "mongoose";

const DashboardSchema = new Schema(
  {
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },

    filename: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    analysisData: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Dashboard = mongoose.model("Dashboard", DashboardSchema);

export default Dashboard;