'use client';
import React, { useState, useEffect } from 'react';
import './globals.css';
import AddDoctor from './components/Adddoctor';
import DoctorCard from '../app/components/DoctorCard';
import FiltersSidebar from '../app/components/Filtersidebar';
import Pagination from '../app/components/Pagination';

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filters, setFilters] = useState({
    consultMode: [],
    experience: [],
    fees: [],
    language: [],
    facility: [],
    specialization: "",
    location: "",
    nearMe: false,
  });
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6; // Number of doctors per page
  
  const handleFilterChange = (updatedFilter) => {
    if (updatedFilter.name === "clearAll") {
      setFilters({
        consultMode: [],
        experience: [],
        fees: [],
        language: [],
        facility: [],
        specialization: "",
        location: "",
        nearMe: false,
      });
    } else if (updatedFilter.name === "nearMe") {
      
      setFilters((prev) => ({
        ...prev,
        nearMe: updatedFilter.value,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [updatedFilter.name]: updatedFilter.value,
      }));
    }
  };

 
  const filterDoctors = () => {
    let filtered = doctors;

    
    if (filters.consultMode.length > 0) {
      filtered = filtered.filter((doctor) =>
        filters.consultMode.every((mode) =>
          doctor.consultMode && doctor.consultMode.includes(mode)
        )
      );
    }

    // Filter by experience
    if (filters.experience.length > 0) {
      filtered = filtered.filter((doctor) => {
        const experience = doctor.experience || 0;
        if (filters.experience.includes("0-5") && experience >= 0 && experience <= 5) {
          return true;
        }
        if (filters.experience.includes("5-10") && experience > 5 && experience <= 10) {
          return true;
        }
        if (filters.experience.includes("10+") && experience > 10) {
          return true;
        }
        return false;
      });
    }


    // Filter by fees
    if (filters.fees.length > 0) {
      filtered = filtered.filter((doctor) => {
        const fee = doctor.consultationFee;
        if (filters.fees.includes("0-500") && fee >= 0 && fee <= 500) {
          return true;
        }
        if (filters.fees.includes("500-750") && fee > 500 && fee <= 750) {
          return true;
        }
        if (filters.fees.includes("750+") && fee > 750) {
          return true;
        }
        return false;
      });
    }

    // Filter by language
    if (filters.language.length > 0) {
      filtered = filtered.filter((doctor) =>
        filters.language.some((lang) => doctor.languages.includes(lang))
      );
    }

    // Filter by facility
    if (filters.facility.length > 0) {
      filtered = filtered.filter((doctor) =>
        filters.facility.some((facility) =>
          doctor.facilities ? doctor.facilities.includes(facility) : false
        )
      );
    }

    // Filter by specialization
    if (filters.specialization) {
      filtered = filtered.filter(
        (doctor) => doctor.specialization === filters.specialization
      );
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((doctor) => doctor.location === filters.location);
    }

    // If nearMe is true, filter by location based on geolocation (mock for now)
    if (filters.nearMe) {
      // Implement location-based filtering based on user's geolocation
      filtered = filtered.filter((doctor) => doctor.isNearMe); // Example logic
    }

    setFilteredDoctors(filtered); // Update filtered doctors list
  };

  // When the filters change, we reapply them
  useEffect(() => {
    if (doctors.length > 0) {
      filterDoctors();
    }
  }, [filters, doctors]);

  // Load dummy data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('https://apolloassgn.onrender.com/api/doctors');
        const data = await res.json();
        console.log("Fetched doctors data:", data);
        setDoctors(data.doctors); // Important!
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);
  useEffect(() => {
    document.body.style.overflow = showAddDoctorForm ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showAddDoctorForm]);

  const closeForm = () => {
    setShowAddDoctorForm(false); 
  };
  // Paginate filtered doctors
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  return (
    <div className="p-8  min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Find General Physicians</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-md transition-all duration-200"
          onClick={() => setShowAddDoctorForm(!showAddDoctorForm)}
        >
          {showAddDoctorForm ? 'Close Add Doctor Form' : 'Add Doctor'}
        </button>
      </div>


      
      {showAddDoctorForm && (
        <>
          
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"></div>

          
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-2xl">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
                onClick={closeForm}
              >
                ×
              </button>
              <AddDoctor closeForm={closeForm} />
            </div>
          </div>
        </>
      )}




      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar */}
        <FiltersSidebar filters={filters} onFilterChange={handleFilterChange} />

        {/* Main Content */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Available Doctors</h2>

          {/* Display filtered doctors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentDoctors.length > 0 ? (
              currentDoctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500 py-8">
                No doctors found based on the selected filters.
              </p>
            )}
          </div>

          <Pagination
            page={currentPage}
            setPage={setCurrentPage}
            totalItems={filteredDoctors.length}
            itemsPerPage={doctorsPerPage}
          />

        </div>
      </div>
    </div>
  );
}