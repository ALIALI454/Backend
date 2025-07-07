import React from 'react';
import { useNavigate } from 'react-router-dom';

const UniversityCommitteeDashboard = () => {
  const navigate = useNavigate();
  
  const stats = {
    pending: 12,
    underReview: 8,
    approved: 5,
    rejected: 3
  };

  const recentApplications = [
    { id: 1, name: "Dr. Asha Mwinyi", department: "Computer Science", status: "Under Review" },
    { id: 2, name: "Dr. John Kimambo", department: "Medicine", status: "Pending" }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-indigo-800 mb-6">Committee Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-gray-500">Under Review</h3>
          <p className="text-2xl font-bold">{stats.underReview}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-gray-500">Approved</h3>
          <p className="text-2xl font-bold">{stats.approved}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <h3 className="text-gray-500">Rejected</h3>
          <p className="text-2xl font-bold">{stats.rejected}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => navigate('/university-committee/applications')}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            View Applications
          </button>
          <button 
            onClick={() => navigate('/university-committee/decision')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Make Decisions
          </button>
          <button 
            onClick={() => navigate('/university-committee/feedback')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Review Feedback
          </button>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Department</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map(app => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{app.name}</td>
                  <td>{app.department}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'Under Review' ? 'bg-blue-100 text-blue-800' : ''
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => navigate(`/university-committee/application-details/${app.id}`)}
                      className="text-indigo-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UniversityCommitteeDashboard;