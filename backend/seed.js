require('dotenv').config();
const mongoose = require('mongoose');
const Application = require('./models/Application');

const samples = [
  { companyName: 'Google', role: 'Software Engineer Intern', type: 'Internship', location: 'Bengaluru', status: 'Applied', applicationDate: '2026-09-01', jobLink: 'https://careers.google.com', notes: 'Referred by a senior' },
  { companyName: 'Microsoft', role: 'Software Engineer Intern', type: 'Internship', location: 'Hyderabad', status: 'Interview', applicationDate: '2026-08-25', interviewDate: '2026-10-10', notes: 'Prepare DSA and system basics' },
  { companyName: 'Amazon', role: 'SDE Intern', type: 'Internship', location: 'Remote', status: 'Rejected', applicationDate: '2026-08-15', notes: 'Failed online assessment' },
  { companyName: 'TCS', role: 'Graduate Engineer', type: 'Full-time', location: 'Kolkata', status: 'Selected', applicationDate: '2026-08-05', notes: 'Offer letter received' },
  { companyName: 'Deloitte', role: 'Technology Intern', type: 'Internship', location: 'Mumbai', status: 'Applied', applicationDate: '2026-09-20' },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Application.deleteMany({});
    await Application.insertMany(samples);
    console.log('Sample data inserted');
  } catch (err) {
    console.error(err.message);
  } finally {
    await mongoose.disconnect();
  }
})();