import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CategoryCriteria.css'; // Hii ni muhimu sana kwa CSS mpya!

const CategoryCriteria = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const categories = [
    {
      title: "Academic Staff",
      positions: [
        "Professors Emeritus",
        "Professors",
        "Associate Professors",
        "Senior Lecturers",
        "Lecturers",
        "Assistant Lecturers",
        "Tutorial Assistants"
      ]
    },
    {
      title: "Library Staff",
      positions: [
        "Library Professors",
        "Associate Library Professors",
        "Senior Librarians",
        "Assistant Librarians"
      ]
    },
    {
      title: "Research Staff",
      positions: [
        "Research Professors",
        "Associate Research Professors",
        "Senior Research Fellows",
        "Research Fellows",
        "Assistant Research Fellows"
      ]
    }
  ];

  const criteria = [
    { id: 1, position: "Tutorial Assistant", qualifications: "Bachelor's degree of a GPA of 3.5 or above", points: 2 },
    { id: 2, position: "Assistant Lecturer", qualifications: "Master's degree with a GPA of 4.0 and above", points: 4 },
    { id: 3, position: "Lecturer", qualifications: "PhD or equivalent degree", points: 6 },
    { id: 4, position: "Senior Lecturer", qualifications: "Promotion from Lecturer with at least 2 years at that post and a minimum of 5 publications", points: 8 },
    { id: 5, position: "Associate Professor", qualifications: "Promotion from Senior Lecturer with at least 3 years at that post and a minimum of 7 publications", points: 10 },
    { id: 6, position: "Professor", qualifications: "Promotion from Associate Professor with at least 5 years at that post and a minimum of 10 publications", points: 12 },
    { id: 7, position: "Assistant Librarian", qualifications: "Bachelor's degree in Library Science or related field", points: 2 },
    { id: 8, position: "Librarian", qualifications: "Master's degree in Library Science or related field", points: 4 },
    { id: 9, position: "Senior Librarian", qualifications: "Master's degree with experience in library management", points: 6 },
    { id: 10, position: "Associate Librarian", qualifications: "Advanced qualifications and significant contributions in library services", points: 8 },
    { id: 11, position: "Research Fellow", qualifications: "PhD with a strong research background", points: 10 },
    { id: 12, position: "Assistant Research Fellow", qualifications: "Master's degree with research experience", points: 4 }
  ];

  const handleMarkAsRead = () => {
    // You can add logic here to actually mark it as read in your backend/state
    console.log("Guidelines marked as read. Navigating to Application Form.");
    navigate('/applicant/application'); // Redirect to the Application Form page
  };

  return (
    <div className="criteria-container-wrapper"> {/* Kifunga kikuu cha ukurasa mzima */}
      <div className="criteria-container"> {/* Container kuu ya yaliyomo */}
        <h2 className="main-title">
          SUZA Promotion Categories and Criteria
        </h2>

        <section className="categories-section">
          <h3 className="section-title">Categories of Academic Employees</h3>
          <div className="categories-grid"> {/* Grid kwa ajili ya categories */}
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <h4 className="category-title">{category.title}</h4>
                <ul className="category-list">
                  {category.positions.map((position, i) => (
                    <li key={i}>{position}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="criteria-section">
          <h3 className="section-title">Promotion Criteria by Position</h3>
          <div className="table-responsive"> {/* Kwa ajili ya table scrolling kwenye mobile */}
            <table className="criteria-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Position</th>
                  <th>Qualifications</th>
                  <th className="text-center">Min. Publication Points</th>
                </tr>
              </thead>
              <tbody>
                {criteria.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.position}</td>
                    <td>{item.qualifications}</td>
                    <td className="text-center points-column">{item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="action-button-container">
          <button onClick={handleMarkAsRead} className="mark-as-read-button">
            Mark as Read & Proceed to Application Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCriteria;