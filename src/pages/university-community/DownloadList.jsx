// // DownloadList.jsx
// import React from "react";
// import { useParams } from "react-router-dom";
// import "./DownloadList.css"; // Import the external CSS file

// const promotions = [
//   {
//     id: 1,
//     applicantName: "John Doe",
//     documents: { announcement: "/documents/announcement_john_doe.pdf" },
//   },
//   {
//     id: 2,
//     applicantName: "Mary Jane",
//     documents: { announcement: "/documents/announcement_mary_jane.pdf" },
//   },
//   {
//     id: 3,
//     applicantName: "Ahmed Salim",
//     documents: { announcement: "/documents/announcement_ahmed_salim.pdf" },
//   },
//   {
//     id: 4,
//     applicantName: "Fatma Abdalla",
//     documents: { announcement: "/documents/announcement_fatma_abdalla.pdf" },
//   },
//   {
//     id: 5,
//     applicantName: "Omar Said",
//     documents: { announcement: "/documents/announcement_omar_said.pdf" },
//   },
//   {
//     id: 6,
//     applicantName: "Asha Suleiman",
//     documents: { announcement: "/documents/announcement_asha_suleiman.pdf" },
//   },
// ];

// const DownloadList = () => {
//   const { id } = useParams();
//   const promotion = promotions.find((p) => p.id === parseInt(id));

//   if (!promotion) {
//     return (
//       <div className="download-list-not-found-container">
//         <p className="download-list-not-found-text">Announcement not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="download-list-container">
//       <div className="download-list-card">
//         <h2 className="download-list-title">Download Announcement</h2>
//         <p className="download-list-description">
//           Download the official announcement for{" "}
//           <strong>{promotion.applicantName}</strong>.
//         </p>
//         <a
//           href={promotion.documents.announcement}
//           download
//           className="download-button"
//         >
//           Download PDF
//         </a>
//       </div>
//     </div>
//   );
// };

// export default DownloadList;



import React from "react";
import { useParams } from "react-router-dom";
import "./DownloadList.css"; // Import the external CSS file

const promotions = [
  {
    id: 1,
    applicantName: "John Doe",
    documents: { announcement: "/documents/announcement_john_doe.pdf" },
  },
  {
    id: 2,
    applicantName: "Mary Jane",
    documents: { announcement: "/documents/announcement_mary_jane.pdf" },
  },
  {
    id: 3,
    applicantName: "Ahmed Salim",
    documents: { announcement: "/documents/announcement_ahmed_salim.pdf" },
  },
  {
    id: 4,
    applicantName: "Fatma Abdalla",
    documents: { announcement: "/documents/announcement_fatma_abdalla.pdf" },
  },
  {
    id: 5,
    applicantName: "Omar Said",
    documents: { announcement: "/documents/announcement_omar_said.pdf" },
  },
  {
    id: 6,
    applicantName: "Asha Suleiman",
    documents: { announcement: "/documents/announcement_asha_suleiman.pdf" },
  },
];

const DownloadList = () => {
  const { id } = useParams();
  const promotion = promotions.find((p) => p.id === parseInt(id));

  if (!promotion) {
    return (
      <div className="download-list-not-found-container">
        <p className="download-list-not-found-text">Announcement not found.</p>
      </div>
    );
  }

  return (
    <div className="download-list-container">
      <div className="download-list-card">
        <h2 className="download-list-title">Download Announcement</h2>
        <p className="download-list-description">
          Download the official announcement for{" "}
          <strong>{promotion.applicantName}</strong>.
        </p>
        <a
          href={promotion.documents.announcement}
          download
          className="download-button"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default DownloadList;
