const express = require('express');
const Application = require('../models/Application');

const router = express.Router();

// GET all applications (newest first)
router.get('/', async (req, res, next) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    next(err);
  }
});

// POST create application
router.post('/', async (req, res, next) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (err) {
    next(err);
  }
});

// PUT update application
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Application not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE application
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;