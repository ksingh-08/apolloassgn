// app/layout.tsx or wherever RootLayout is
import { Search, MapPin, User, Instagram } from "lucide-react"; // or use Heroicons if preferred
import logo from './logo.png';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {/* Top Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            {/* Left: Logo and Location */}
            <div className="flex items-center space-x-4">
              <img src={logo.src}  alt="Apollo 24|7" width={80} height={40} />
              <div className="flex items-center space-x-1 text-sm text-gray-700">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Select Address</span>
                <span className="ml-1 text-xs">▼</span>
              </div>
            </div>

            {/* Center: Search */}
            <div className="flex-1 mx-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Doctors, Specialities, Conditions etc."
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Right: Login */}
            <button className="flex items-center border border-indigo-600 text-indigo-600 px-4 py-1.5 rounded-md text-sm hover:bg-indigo-50">
              <User className="w-4 h-4 mr-2" />
              Login
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="border-t border-gray-100 pl-85">
            <div className="max-w-7xl mx-auto px-4 py-2 flex space-x-6 text-sm font-medium text-gray-700">
              <span className="cursor-pointer hover:text-indigo-600">Buy Medicines</span>
              <span className="cursor-pointer hover:text-indigo-600">Find Doctors</span>
              <span className="cursor-pointer hover:text-indigo-600">Lab Tests</span>
              <span className="cursor-pointer hover:text-indigo-600">Circle Membership</span>
              <span className="cursor-pointer hover:text-indigo-600">Health Records</span>
              <span className="cursor-pointer hover:text-indigo-600">Diabetes Reversal</span>
              <div className="flex items-center space-x-1">
                <span className="cursor-pointer hover:text-indigo-600">Buy Insurance</span>
                <span className="text-xs text-white bg-teal-200 text-teal-700 px-1.5 py-0.5 rounded">New</span>
              </div>
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
