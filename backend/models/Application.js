const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: [true, 'Company name is required'], trim: true },
    role: { type: String, required: [true, 'Role is required'], trim: true },
    type: {
      type: String,
      enum: ['Internship', 'Full-time'],
      required: [true, 'Type is required'],
      default: 'Internship',
    },
    location: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['Saved', 'Applied', 'Assessment', 'Interview', 'Selected', 'Rejected'],
      required: [true, 'Status is required'],
      default: 'Applied',
    },
    applicationDate: { type: Date, default: Date.now },
    interviewDate: { type: Date },
    jobLink: { type: String, trim: true, default: '' },
    notes: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);