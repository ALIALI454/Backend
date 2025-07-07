import React, { useState, useEffect } from "react";
import ApprovedPromotions from "./ApprovedPromotions";
import PromotionDetails from "./PromotionDetails";
import SearchFilter from "./SearchFilter";
import DownloadList from "./DownloadList";
// No need to import a separate CSS file if using Tailwind classes directly in JSX
// import "./UniversityCommunityDashboard.css"; // Removed this as we are using Tailwind directly

const UniversityCommunityDashboard = () => {
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");

  useEffect(() => {
    const mockPromotions = [
      {
        id: 1,
        applicantName: "Amina Juma",
        previousPosition: "Lecturer",
        newPosition: "Senior Lecturer",
        department: "Computer Science",
        approvalDate: "2023-11-15",
        effectiveDate: "2024-01-01",
        announcementDate: "2023-11-20",
        documents: { announcement: "/documents/announcement_amina_juma.pdf" },
      },
      {
        id: 2,
        applicantName: "Baraka Omar",
        previousPosition: "Assistant Professor",
        newPosition: "Associate Professor",
        department: "Physics",
        approvalDate: "2024-03-01",
        effectiveDate: "2024-07-01",
        announcementDate: "2024-03-10",
        documents: { announcement: "/documents/announcement_baraka_omar.pdf" },
      },
      {
        id: 3,
        applicantName: "Zawadi Musa",
        previousPosition: "Research Assistant",
        newPosition: "Lecturer",
        department: "Mathematics",
        approvalDate: "2023-09-20",
        effectiveDate: "2024-01-01",
        announcementDate: "2023-09-25",
        documents: { announcement: "/documents/announcement_zawadi_musa.pdf" },
      },
      {
        id: 4,
        applicantName: "Khadija Said",
        previousPosition: "Senior Lecturer",
        newPosition: "Associate Professor",
        department: "Biology",
        approvalDate: "2024-01-05",
        effectiveDate: "2024-06-01",
        announcementDate: "2024-01-15",
        documents: null, // Example: no document available
      },
      {
        id: 5,
        applicantName: "Juma Ali",
        previousPosition: "Associate Professor",
        newPosition: "Professor",
        department: "Chemistry",
        approvalDate: "2023-12-10",
        effectiveDate: "2024-05-01",
        announcementDate: "2023-12-20",
        documents: { announcement: "/documents/announcement_juma_ali.pdf" },
      },
      {
        id: 6,
        applicantName: "Neema Charles",
        previousPosition: "Lecturer",
        newPosition: "Senior Lecturer",
        department: "English",
        approvalDate: "2024-02-28",
        effectiveDate: "2024-08-01",
        announcementDate: "2024-03-05",
        documents: { announcement: "/documents/announcement_neema_charles.pdf" },
      },
    ];
    setPromotions(mockPromotions);
    setFilteredPromotions(mockPromotions); // Initialize filteredPromotions
  }, []);

  useEffect(() => {
    const filtered = promotions.filter((promo) => {
      const matchesSearch =
        promo.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = filterYear
        ? promo.approvalDate.startsWith(filterYear)
        : true;
      return matchesSearch && matchesYear;
    });
    setFilteredPromotions(filtered);

    // Clear selected promotion if it's filtered out
    if (selectedPromotion && !filtered.some(p => p.id === selectedPromotion.id)) {
      setSelectedPromotion(null);
    }
  }, [promotions, searchTerm, filterYear, selectedPromotion]); // Added selectedPromotion to dependency array

  const handleSelectPromotion = (id) => {
    const promo = promotions.find((p) => p.id === id);
    setSelectedPromotion(promo);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-4 tracking-tight">
        University Community Promotions
      </h2>
      <p className="text-lg text-center text-gray-600 mb-10 border-b pb-6 border-blue-200">
        View official promotion announcements from the HR Board and explore faculty achievements.
      </p>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterYear={filterYear}
        onYearChange={setFilterYear}
      />

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Left Side - List and Download */}
        <div className="flex-1 min-w-[300px] md:min-w-[350px]">
          <ApprovedPromotions
            promotions={filteredPromotions}
            onSelect={handleSelectPromotion}
            selectedId={selectedPromotion?.id}
          />
          <div className="mt-6">
            {" "}
            {/* Added margin top for spacing */}
            <DownloadList promotions={filteredPromotions} />
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="flex-2 w-full md:w-2/3">
          {selectedPromotion ? (
            <PromotionDetails promotion={selectedPromotion} />
          ) : (
            <div className="flex items-center justify-center border-2 border-dashed border-blue-300 rounded-xl p-10 text-gray-600 bg-blue-50 min-h-[300px] text-lg font-medium shadow-inner transition-all duration-300 ease-in-out">
              <p className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto mb-4 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7 3v2a4 4 0 004 4h.5M7 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-1a2 2 0 00-2-2H9a2 2 0 00-2 2z"
                  />
                </svg>
                Select a promotion from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityCommunityDashboard;
