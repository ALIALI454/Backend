// ApprovedPromotions.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
// SearchFilter is NOT imported here if it's meant to navigate to this page
import "./ApprovedPromotions.css"; // Import the external CSS file

const allPromotions = [ // Renamed to allPromotions to distinguish from filtered ones
  {
    id: 1,
    applicantName: "John Doe",
    previousPosition: "Lecturer",
    newPosition: "Senior Lecturer",
    department: "Computer Science",
    approvalDate: "2023-11-15",
    effectiveDate: "2024-01-01",
    documents: { announcement: "/documents/announcement_john_doe.pdf" },
  },
  {
    id: 2,
    applicantName: "Mary Jane",
    previousPosition: "Assistant Lecturer",
    newPosition: "Lecturer",
    department: "Education",
    approvalDate: "2024-03-10",
    effectiveDate: "2024-04-01",
    documents: { announcement: "/documents/announcement_mary_jane.pdf" },
  },
  {
    id: 3,
    applicantName: "Ahmed Salim",
    previousPosition: "Senior Lecturer",
    newPosition: "Associate Professor",
    department: "Physics",
    approvalDate: "2024-02-05",
    effectiveDate: "2024-03-01",
    documents: { announcement: "/documents/announcement_ahmed_salim.pdf" },
  },
  {
    id: 4,
    applicantName: "Fatma Abdalla",
    previousPosition: "Lecturer",
    newPosition: "Senior Lecturer",
    department: "Chemistry",
    approvalDate: "2024-05-20",
    effectiveDate: "2024-06-15",
    documents: { announcement: "/documents/announcement_fatma_abdalla.pdf" },
  },
  {
    id: 5,
    applicantName: "Omar Said",
    previousPosition: "Assistant Lecturer",
    newPosition: "Lecturer",
    department: "Law",
    approvalDate: "2024-01-12",
    effectiveDate: "2024-02-01",
    documents: { announcement: "/documents/announcement_omar_said.pdf" },
  },
  {
    id: 6,
    applicantName: "Asha Suleiman",
    previousPosition: "Senior Lecturer",
    newPosition: "Associate Professor",
    department: "History",
    approvalDate: "2023-12-18",
    effectiveDate: "2024-01-15",
    documents: { announcement: "/documents/announcement_asha_suleiman.pdf" },
  },
];

const ApprovedPromotions = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access URL location object
  const [filteredPromotions, setFilteredPromotions] = useState([]);

  // useEffect to filter promotions based on URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("search") || "";
    const filterYear = queryParams.get("year") || "";

    let currentFiltered = [...allPromotions]; // Start with all promotions

    // Apply search term filter
    if (searchTerm) {
      currentFiltered = currentFiltered.filter(
        (promo) =>
          promo.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          promo.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply year filter
    if (filterYear) {
      currentFiltered = currentFiltered.filter(
        (promo) => new Date(promo.approvalDate).getFullYear() === parseInt(filterYear)
      );
    }

    setFilteredPromotions(currentFiltered);
  }, [location.search]); // Depend on location.search so it re-filters when URL changes

  const handleViewDetails = (id) => {
    navigate(`/university-community/details/${id}`); // Adjust path as per your routing
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 to-blue-50 p-6">
      <h2 className="approved-promotions-title">Approved Promotions</h2>
      <div className="promotions-grid">
        {filteredPromotions.length > 0 ? (
          filteredPromotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="applicant-name">{promo.applicantName}</h3>
                <p className="positions">
                  {promo.previousPosition} ➡️ {promo.newPosition}
                </p>
                <p className="department">{promo.department}</p>
                <p className="date">Approved: {promo.approvalDate}</p>
                <p className="date">Effective: {promo.effectiveDate}</p>
              </div>
              <button
                onClick={() => handleViewDetails(promo.id)}
                className="mt-4 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="no-promotions-found">No approved promotions found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ApprovedPromotions;