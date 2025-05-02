const Doctor = require('../models/doctor');

// @desc    Add a new doctor
// @route   POST /api/doctors
// @access  Private (would require authentication in a real app)
exports.addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all doctors with filters and pagination
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build query based on filters
    const queryObj = {};
    
    // Filter by specialization
    if (req.query.specialization) {
      queryObj.specialization = req.query.specialization;
    }
    
    // Filter by gender
    if (req.query.gender) {
      queryObj.gender = req.query.gender;
    }
    
    // Filter by location
    if (req.query.location) {
      queryObj.location = req.query.location;
    }
    
    // Filter by experience (years)
        // Experience ranges from checkboxes
        if (req.query.experience) {
          const experienceRanges = Array.isArray(req.query.experience)
            ? req.query.experience
            : [req.query.experience];
    
          queryObj.$or = experienceRanges.map(range => {
            if (range === "0-5") return { experience: { $gte: 0, $lte: 5 } };
            if (range === "5-10") return { experience: { $gt: 5, $lte: 10 } };
            if (range === "10+") return { experience: { $gt: 10 } };
            return {};
          });
        }
    
        // Consultation Fee ranges
        if (req.query.fees) {
          const feeRanges = Array.isArray(req.query.fees)
            ? req.query.fees
            : [req.query.fees];
    
          queryObj.$or = [
            ...(queryObj.$or || []),
            ...feeRanges.map(range => {
              if (range === "0-500") return { consultationFee: { $gte: 0, $lte: 500 } };
              if (range === "500-750") return { consultationFee: { $gt: 500, $lte: 750 } };
              if (range === "750+") return { consultationFee: { $gt: 750 } };
              return {};
            })
          ];
        }
    
        // Languages
        if (req.query.language) {
          const languages = Array.isArray(req.query.language)
            ? req.query.language
            : [req.query.language];
          queryObj.languages = { $in: languages };
        }
    
        // Consult Mode (optional, based on your schema)
        if (req.query.consultMode) {
          const consultModes = Array.isArray(req.query.consultMode)
            ? req.query.consultMode
            : [req.query.consultMode];
          queryObj.consultMode = { $in: consultModes };
        }
    
    
    // Filter by availability
    if (req.query.availableDay) {
      queryObj.availableDays = req.query.availableDay;
    }
    
    // Filter by min rating
    if (req.query.minRating) {
      queryObj.rating = { $gte: parseFloat(req.query.minRating) };
    }
    
    // Search by text
    if (req.query.search) {
      queryObj.$text = { $search: req.query.search };
    }
    
    // Sorting
    let sortOption = {};
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'experience_high':
          sortOption = { experience: -1 };
          break;
        case 'experience_low':
          sortOption = { experience: 1 };
          break;
        case 'fee_high':
          sortOption = { consultationFee: -1 };
          break;
        case 'fee_low':
          sortOption = { consultationFee: 1 };
          break;
        case 'rating':
          sortOption = { rating: -1 };
          break;
        default:
          sortOption = { rating: -1 }; // Default sort
      }
    } else {
      sortOption = { rating: -1 }; // Default sort by rating
    }
    
    // Execute query with pagination
    const doctors = await Doctor.find(queryObj)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
      
    // Get total count for pagination
    const total = await Doctor.countDocuments(queryObj);
    
    // Get all available specializations for filters
    const specializations = await Doctor.distinct('specialization');
    
    // Get all available locations for filters
    const locations = await Doctor.distinct('location');
    
    res.status(200).json({
      doctors,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      },
      filters: {
        specializations,
        locations
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};