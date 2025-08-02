import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- Import useNavigate
import './SchoolList.css';

const SchoolList = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetch('http://localhost:8080/api/schools')
      .then(res => res.json())
      .then(data => {
        setSchools(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch schools:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading schools...</p>;

  return (
    <div className="school-container">
      {schools.map((school) => (
        <div key={school.sId} className="school-card">
          <h3>{school.sName}</h3>
          <div className="button-container">
            <button 
              onClick={() => alert(`Add staff for school ID: ${school.sId}`)} 
              className="btn btn-add"
            >
              Add Staff
            </button>
            <button 
              onClick={() => navigate(`/admin/schoolapplication?schoolId=${school.sId}`)}  // Navigate with query param
              className="btn btn-view"
            >
              View Applications
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchoolList;
