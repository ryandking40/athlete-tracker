import Image from "next/image";
import { Edit, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-full bg-gray-200">
                  {/* Profile image placeholder */}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Ryan King</h2>
                  <p className="text-gray-600">Profile Completion: 0%</p>
                </div>
              </div>
              <button className="text-red-600 hover:text-red-700">
                <Edit className="w-5 h-5" />
              </button>
            </div>

            {/* Coaching Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Coaching</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <h4 className="font-medium">Conway Springs High School</h4>
                    <p className="text-sm text-gray-600">Conway Springs, KS</p>
                  </div>
                </div>
                <button className="mt-4 text-sm text-gray-600 hover:text-gray-700">
                  Add Item
                </button>
              </div>
            </div>

            {/* Education Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Education</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">You have not yet added to your education history.</p>
                <button className="mt-4 text-sm text-gray-600 hover:text-gray-700">
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Certifications</h3>
              <button className="text-red-600 hover:text-red-700">
                <Edit className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <p className="text-gray-600">You have not added any certifications to your profile.</p>
              <button className="mt-4 inline-flex items-center gap-2 text-red-600 hover:text-red-700">
                <Plus className="w-4 h-4" />
                Add Certification
              </button>
            </div>
          </div>

          {/* Workout Packages */}
          <div className="bg-white rounded-lg shadow p-6 mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Workout Packages</h3>
              <div className="space-x-2">
                <button className="text-sm text-gray-600 hover:text-gray-700">Add</button>
                <button className="text-sm text-red-600 hover:text-red-700">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 