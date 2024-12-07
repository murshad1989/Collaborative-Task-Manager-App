const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  dueDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
