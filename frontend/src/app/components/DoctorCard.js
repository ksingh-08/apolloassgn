import React from 'react';
import { Star, MapPin, Languages, Award, Calendar } from "lucide-react";
import p from '../../app/pic.jpg';

const DoctorCard = ({ doctor }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
    <div className="relative">
      <img src={p.src} alt={doctor.name} className="w-full h-78 object-cover" />
      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow flex items-center">
        <Star className="w-4 h-4 text-yellow-500 mr-1" />
        <span className="font-semibold text-gray-800">{doctor.rating}</span>
        <span className="text-xs text-gray-500 ml-1">({doctor.reviewCount})</span>
      </div>
    </div>
    <div className="p-5">
      <div className="mb-3">
        <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
        <div className="flex items-center mt-1">
          <span className="text-indigo-600 font-medium">{doctor.specialization}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-600 text-sm flex items-center">
            <Award className="w-4 h-4 mr-1 text-gray-500" />
            {doctor.experience} yrs exp
          </span>
        </div>
        <p className="text-gray-500 text-sm">{doctor.qualification}</p>
      </div>
      <div className="flex items-start mb-3">
        <MapPin className="w-4 h-4 text-gray-500 mt-1 mr-2" />
        <p className="text-gray-600 text-sm">{doctor.clinicName}, {doctor.location}</p>
      </div>
      <div className="flex items-start mb-3">
        <Languages className="w-4 h-4 text-gray-500 mt-1 mr-2" />
        <p className="text-sm text-gray-600">{doctor.languages.join(', ')}</p>
      </div>
      <div className="flex items-start mb-3">
        <Calendar className="w-4 h-4 text-gray-500 mt-1 mr-2" />
        <p className="text-sm text-gray-600">{doctor.availableDays.join(', ')}</p>
      </div>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doctor.description}</p>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-lg font-bold text-gray-900">₹{doctor.consultationFee}</p>
          <p className="text-xs text-gray-500">Consultation Fee</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full text-sm font-medium transition-colors duration-200">
          Book Now
        </button>
      </div>
    </div>
  </div>
);

export default DoctorCard;
