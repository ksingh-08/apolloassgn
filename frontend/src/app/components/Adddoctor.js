import { useState, useEffect } from 'react';
import { AlertCircle, X, CheckCircle, UserPlus } from 'lucide-react';

// Add animation styles
const styles = `
  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
  .animation-pop-in {
    animation: popIn 0.3s ease-out forwards;
  }
`;

export default function AddDoctor({ closeForm }) {
  // Add style tag for animations
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    qualification: '',
    gender: 'Male',
    consultationFee: '',
    location: '',
    imageUrl: '',
    description: '',
    languages: [],
    availableDays: [],
    consultMode: [],
    facilities: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const updated = checked
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value);
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });
    
    try {
      const payload = {
        ...formData,
        experience: parseInt(formData.experience) || 0,
        consultationFee: parseInt(formData.consultationFee) || 0,
      };

      const res = await fetch('https://apolloassgn.onrender.com/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setFormStatus({ 
          type: 'success', 
          message: 'Doctor added successfully!' 
        });
        setTimeout(() => closeForm(), 1500);
      } else {
        const err = await res.json();
        setFormStatus({ 
          type: 'error', 
          message: `Failed to add doctor. ${err.message}` 
        });
      }
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: 'Network error. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-screen overflow-y-auto animation-pop-in">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10 rounded-t-lg">
          <h2 className="text-xl font-bold flex items-center text-gray-800">
            <UserPlus className="mr-2 h-5 w-5 text-indigo-600" />
            Add New Doctor
          </h2>
          <button 
            onClick={closeForm}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        {formStatus.type && (
          <div className={`mx-6 mt-4 p-3 rounded-md flex items-center ${
            formStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {formStatus.type === 'success' ? 
              <CheckCircle className="h-5 w-5 mr-2" /> : 
              <AlertCircle className="h-5 w-5 mr-2" />
            }
            <p>{formStatus.message}</p>
          </div>
        )}

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor's Name</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Dr. John Smith" 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <input 
              name="specialization" 
              value={formData.specialization} 
              onChange={handleChange} 
              placeholder="Cardiology" 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
            <input 
              type="number"
              name="experience" 
              value={formData.experience} 
              onChange={handleChange} 
              placeholder="10" 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
            <input 
              name="qualification" 
              value={formData.qualification} 
              onChange={handleChange} 
              placeholder="MBBS, MD" 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input 
                type="number" 
                name="consultationFee" 
                value={formData.consultationFee} 
                onChange={handleChange} 
                placeholder="150" 
                className="w-full pl-7 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              placeholder="New York Medical Center" 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleChange} 
              placeholder="https://example.com/doctor.jpg" 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Brief description about the doctor's expertise and approach" 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24" 
            />
          </div>

          {/* Languages */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken</label>
            <div className="flex flex-wrap gap-2">
              {['English', 'Hindi', 'Bengali', 'Tamil', 'Spanish', 'French', 'German', 'Arabic', 'Chinese'].map(lang => (
                <label key={lang} className="flex items-center bg-gray-50 p-2 rounded-md border border-gray-200 hover:border-indigo-300 cursor-pointer">
                  <input
                    type="checkbox"
                    value={lang}
                    checked={formData.languages.includes(lang)}
                    onChange={(e) => handleCheckboxChange(e, 'languages')}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm">{lang}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Available Days */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Mon', value: 'Monday' },
                { label: 'Tue', value: 'Tuesday' },
                { label: 'Wed', value: 'Wednesday' },
                { label: 'Thu', value: 'Thursday' },
                { label: 'Fri', value: 'Friday' },
                { label: 'Sat', value: 'Saturday' },
                { label: 'Sun', value: 'Sunday' }
              ].map(day => (
                <label key={day.value} className="flex items-center bg-gray-50 p-2 rounded-md border border-gray-200 hover:border-indigo-300 cursor-pointer">
                  <input
                    type="checkbox"
                    value={day.value}
                    checked={formData.availableDays.includes(day.value)}
                    onChange={(e) => handleCheckboxChange(e, 'availableDays')}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm">{day.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Consult Mode */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Modes</label>
            <div className="flex flex-wrap gap-2">
              {['In-person', 'Video Call', 'Phone Call', 'Chat', 'Home Visit'].map(mode => (
                <label key={mode} className="flex items-center bg-gray-50 p-2 rounded-md border border-gray-200 hover:border-indigo-300 cursor-pointer">
                  <input
                    type="checkbox"
                    value={mode}
                    checked={formData.consultMode.includes(mode)}
                    onChange={(e) => handleCheckboxChange(e, 'consultMode')}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm">{mode}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
            <div className="flex flex-wrap gap-2">
              {[
                'Wheelchair Access', 
                'Pharmacy', 
                'Lab Testing', 
                'Insurance Accepted', 
                'Emergency Services',
                'Free Parking', 
                'Online Booking'
              ].map(facility => (
                <label key={facility} className="flex items-center bg-gray-50 p-2 rounded-md border border-gray-200 hover:border-indigo-300 cursor-pointer">
                  <input
                    type="checkbox"
                    value={facility}
                    checked={formData.facilities.includes(facility)}
                    onChange={(e) => handleCheckboxChange(e, 'facilities')}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm">{facility}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button 
              type="button" 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Saving...' : 'Add Doctor'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}