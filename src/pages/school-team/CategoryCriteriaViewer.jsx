import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCriteriaViewer = ({ position }) => {
  const navigate = useNavigate();

  const handleMarkAsViewed = () => {
    navigate('/school-team/applications');
  };

  const categories = [
    {
      title: "Academic Staff",
      positions: [
        "Professors Emeritus", "Professors", "Associate Professors",
        "Senior Lecturers", "Lecturers", "Assistant Lecturers", "Tutorial Assistants"
      ]
    },
    {
      title: "Library Staff",
      positions: [
        "Library Professors", "Associate Library Professors",
        "Senior Librarians", "Assistant Librarians"
      ]
    },
    {
      title: "Research Staff",
      positions: [
        "Research Professors", "Associate Research Professors",
        "Senior Research Fellows", "Research Fellows", "Assistant Research Fellows"
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

  const selectedCriteria = criteria.find(item => item.position === position);

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#2c3e50',
        borderBottom: '2px solid #3498db',
        paddingBottom: '10px',
        textAlign: 'center'
      }}>
        SUZA Promotion Categories and Criteria
      </h2>

      {/* Selected position */}
      {position && selectedCriteria && (
        <div style={{
          backgroundColor: '#eaf4ff',
          padding: '15px',
          margin: '25px 0',
          borderLeft: '5px solid #3498db',
          borderRadius: '6px'
        }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Criteria for <span style={{ color: '#2980b9' }}>{position}</span></h3>
          <p><strong>Qualifications:</strong> {selectedCriteria.qualifications}</p>
          <p><strong>Minimum Publication Points:</strong> <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>{selectedCriteria.points}</span></p>
        </div>
      )}

      {/* Category Table */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#3498db' }}>Categories of Academic Employees</h3>
        {categories.map((category, index) => (
          <div key={index} style={{
            marginBottom: '25px',
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '5px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{
              color: '#2c3e50',
              borderBottom: '1px solid #eee',
              paddingBottom: '5px'
            }}>{category.title}</h4>
            <ul style={{
              listStyleType: 'disc',
              paddingLeft: '20px',
              columns: '2',
              gap: '20px'
            }}>
              {category.positions.map((pos, i) => (
                <li key={i} style={{
                  marginBottom: '5px',
                  fontWeight: pos === position ? 'bold' : 'normal',
                  color: pos === position ? '#2980b9' : '#2c3e50'
                }}>{pos}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Criteria Table */}
      <div>
        <h3 style={{ color: '#3498db' }}>Promotion Criteria by Position</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#3498db', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>No.</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Position</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Qualifications</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Min. Publication Points</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((item, index) => (
                <tr key={item.id} style={{
                  borderBottom: '1px solid #eee',
                  backgroundColor: item.position === position ? '#eaf4ff' : (index % 2 === 0 ? '#f8f9fa' : 'white')
                }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{item.id}</td>
                  <td style={{
                    padding: '12px',
                    fontWeight: item.position === position ? 'bold' : '500',
                    color: item.position === position ? '#2980b9' : '#2c3e50'
                  }}>
                    {item.position}
                  </td>
                  <td style={{ padding: '12px' }}>{item.qualifications}</td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#2ecc71'
                  }}>{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={handleMarkAsViewed}
          style={{
            padding: '10px 25px',
            backgroundColor: '#3498db',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          Mark as Viewed
        </button>
      </div>
    </div>
  );
};

export default CategoryCriteriaViewer;
