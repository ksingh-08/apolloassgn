const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Doctor = require('./models/doctor');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Sample data
const doctors = [
  {
    name: "Dr. Aditya Sharma",
    specialization: "General Physician",
    experience: 15,
    qualification: "MBBS, MD (Internal Medicine)",
    languages: ["English", "Hindi"],
    gender: "Male",
    clinicName: "HealthFirst Clinic",
    location: "Mumbai",
    consultationFee: 800,
    rating: 4.8,
    reviewCount: 124,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
    imageUrl: "/doctor-1.png",
    description: "Dr. Aditya Sharma is a renowned physician with over 15 years of experience in treating various ailments."
  },
  {
    name: "Dr. Priya Patel",
    specialization: "General Physician",
    experience: 12,
    qualification: "MBBS, DNB (Family Medicine)",
    languages: ["English", "Hindi", "Gujarati"],
    gender: "Female",
    clinicName: "Care Medical Center",
    location: "Delhi",
    consultationFee: 700,
    rating: 4.7,
    reviewCount: 98,
    availableDays: ["Monday", "Wednesday", "Thursday", "Saturday"],
    imageUrl: "/doctor-2.png",
    description: "Dr. Priya specializes in family medicine with focus on preventive healthcare."
  },
  // Add rest of doctor data here...
  {
    name: "Dr. Lakshmi Rao",
    specialization: "General Physician",
    experience: 13,
    qualification: "MBBS, MD (General Medicine)",
    languages: ["English", "Hindi", "Tamil", "Kannada"],
    gender: "Female",
    clinicName: "Rao Medical Center",
    location: "Bangalore",
    consultationFee: 850,
    rating: 4.7,
    reviewCount: 156,
    availableDays: ["Monday", "Wednesday", "Thursday", "Friday"],
    imageUrl: "/doctor-10.png",
    description: "Dr. Lakshmi specializes in respiratory disorders and general medicine."
  }
];

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await Doctor.deleteMany();
    
    // Import new data
    await Doctor.insertMany(doctors);
    
    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data
const destroyData = async () => {
  try {
    await Doctor.deleteMany();
    
    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run seed function based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}