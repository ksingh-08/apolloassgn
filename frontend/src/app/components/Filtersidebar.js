import React from 'react';

const FiltersSidebar = ({ filters, onFilterChange }) => {
    const CheckboxGroup = ({ title, options, filterName, selectedValues }) => (
        <div className="mb-6">
            <h4 className="font-medium mb-2 text-gray-700">{title}</h4>
            <div className="space-y-2">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`${filterName}-${option.value}`}
                            checked={selectedValues.includes(option.value)}
                            onChange={() => {
                                const updatedValues = selectedValues.includes(option.value)
                                    ? selectedValues.filter(v => v !== option.value)
                                    : [...selectedValues, option.value];
                                onFilterChange({ name: filterName, value: updatedValues });
                            }}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor={`${filterName}-${option.value}`} className="ml-2 text-sm text-gray-700">
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="w-full md:w-1/4 p-6 bg-white rounded-lg shadow-md mb-6 md:mb-0 md:mr-6 sticky top-4 self-start">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                    onClick={() => onFilterChange({ name: "clearAll" })}
                >
                    Clear All
                </button>
            </div>

            {/* Consult Mode */}
            <CheckboxGroup
                title="Consultation Mode"
                options={[
                    { label: "In-person", value: "in-person" },
                    { label: "Video", value: "video" },
                    { label: "Chat", value: "chat" },
                    { label: "Phone Call", value: "PhoneCall" },
                    { label: "Home Visit", value: "HomeVisit" } 
                ]}
                filterName="consultMode"
                selectedValues={filters.consultMode}
            />

            {/* Experience */}
            <CheckboxGroup
                title="Experience"
                options={[
                    { label: "0-5 years", value: "0-5" },
                    { label: "5-10 years", value: "5-10" },
                    { label: "10+ years", value: "10+" }
                ]}
                filterName="experience"
                selectedValues={filters.experience}
            />

            {/* Fees */}
            <CheckboxGroup
                title="Consultation Fee"
                options={[
                    { label: "₹0 - ₹500", value: "0-500" },
                    { label: "₹500 - ₹750", value: "500-750" },
                    { label: "₹750+", value: "750+" }
                ]}
                filterName="fees"
                selectedValues={filters.fees}
            />

            {/* Languages */}
            <CheckboxGroup
                title="Languages Spoken"
                options={[
                    { label: "English", value: "English" },
                    { label: "Hindi", value: "Hindi" },
                    { label: "Bengali", value: "Bengali" },
                    { label: "Marathi", value: "Marathi" },
                    { label: "Gujarati", value: "Gujarati" },
                    { label: "Urdu", value: "Urdu" }
                ]}
                filterName="language"
                selectedValues={filters.language}
            />

            {/* Facilities */}
            <CheckboxGroup
                title="Facilities"
                options={[
                    { label: "Online Prescription", value: "online-prescription" },
                    { label: "Home Visit", value: "home-visit" },
                    { label: "Wheelchair Access", value: "wheelchair-access" },
                    { label: "Pharmacy", value: "pharmacy" },
                    { label: "Insurance Accepted", value: "insurance-accepted" },
                    { label: "Emergency Services", value: "emergency-services" },
                    { label: "Free Parking", value: "free-parking" },
                    { label: "Online Booking", value: "online-booking" },
                ]}
                filterName="facility"
                selectedValues={filters.facility}
            />


            {/* Location Dropdown */}
            <div className="mb-6">
                <h4 className="font-medium mb-2 text-gray-700">Location</h4>
                <select
                    className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={filters.location}
                    onChange={(e) => onFilterChange({ name: "location", value: e.target.value })}
                >
                    <option value="">All Locations</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Pune">Pune</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="Chandigarh">Chandigarh</option>
                </select>
            </div>

            {/* Specialization Dropdown */}
            <div className="mb-6">
                <h4 className="font-medium mb-2 text-gray-700">Specialization</h4>
                <select
                    className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={filters.specialization}
                    onChange={(e) => onFilterChange({ name: "specialization", value: e.target.value })}
                >
                    <option value="">All Specializations</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Rheumatology">Rheumatology</option>
                    
                </select>
            </div>

            {/* Near Me Toggle */}
            <div className="mb-6">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="near-me"
                        checked={filters.nearMe}
                        onChange={(e) => onFilterChange({ name: "nearMe", value: e.target.checked })}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="near-me" className="ml-2 text-sm text-gray-700">
                        Doctors Near Me
                    </label>
                </div>
            </div>

            {/* Apply Filters Button */}
            <button
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FiltersSidebar;
