import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PromotionDetails.css";

const promotions = [
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

const PromotionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewVisible, setViewVisible] = useState(false);

  const promotion = promotions.find((p) => p.id === parseInt(id, 10));

  if (!promotion) {
    return (
      <div className="promotion-details-container">
        <div className="promotion-details-not-found">
          <h2>Promotion Not Found</h2>
          <p>The promotion you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const handleView = () => {
    setViewVisible(true);
  };

  const handleDownloadRedirect = () => {
    navigate(`/university-community/list/${promotion.id}`);
  };

  return (
    <div className="promotion-details-container">
      <div className="promotion-details-card">
        <h2 className="promotion-details-title">{promotion.applicantName}</h2>

        {!viewVisible ? (
          <div className="view-download-link" onClick={handleView}>
            📄 View Details
          </div>
        ) : (
          <>
            <div className="promotion-info">
              <p>
                <span className="info-label">Department:</span> {promotion.department}
              </p>
              <p>
                <span className="info-label">From:</span> {promotion.previousPosition}
              </p>
              <p>
                <span className="info-label">To:</span> {promotion.newPosition}
              </p>
              <p>
                <span className="info-label">Approved:</span> {promotion.approvalDate}
              </p>
              <p>
                <span className="info-label">Effective:</span> {promotion.effectiveDate}
              </p>
            </div>
            <button className="download-button" onClick={handleDownloadRedirect}>
              Go to Download Announcement
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PromotionDetails;
