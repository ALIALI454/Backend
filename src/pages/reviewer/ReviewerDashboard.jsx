const ReviewerDashboard = () => {
  const stats = [
    { title: 'Assigned Applications', value: 15, change: '+3' },
    { title: 'Completed Reviews', value: 8, change: '+2' },
    { title: 'Pending Reviews', value: 7, change: '+1' },
    { title: 'Upcoming Deadlines', value: 3, change: 'Today' },
  ];

  const upcomingDeadlines = [
    { id: 1, applicationId: 101, applicant: 'Alice Johnson', deadline: 'Today' },
    { id: 2, applicationId: 102, applicant: 'Bob Williams', deadline: 'Tomorrow' },
    { id: 3, applicationId: 103, applicant: 'Charlie Brown', deadline: 'June 15' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reviewer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
            <p className={`text-sm mt-1 ${
              typeof stat.change === 'string' && stat.change.startsWith('+') ? 'text-green-500' : 
              stat.change === 'Today' ? 'text-red-500' : 'text-gray-500'
            }`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
          <ul className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <li key={deadline.id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Application #{deadline.applicationId}</p>
                    <p className="text-sm text-gray-500">Applicant: {deadline.applicant}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    deadline.deadline === 'Today' ? 'bg-red-100 text-red-800' : 
                    deadline.deadline === 'Tomorrow' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {deadline.deadline}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <button className="mt-4 text-blue-500 hover:text-blue-700">
            View all deadlines →
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Start Review
            </button>
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Submit Feedback
            </button>
            <button className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
              Request Extension
            </button>
            <button className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
              View Guidelines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerDashboard;