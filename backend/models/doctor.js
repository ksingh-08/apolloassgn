const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: Number,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  languages: [{
    type: String,
    trim: true
  }],
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  clinicName: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true,
    required: true
  },
  consultationFee: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  availableDays: {
    type: [String],
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },  
  imageUrl: {
    type: String,
    default: '/default-doctor.png'
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
DoctorSchema.index({ 
  name: 'text', 
  specialization: 'text', 
  qualification: 'text', 
  location: 'text',
  description: 'text'
});

module.exports = mongoose.model('Doctor', DoctorSchema);