// import React from 'react';

// const CategoryCriteria = () => {
//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Promotion Categories and Criteria</h2>
//       <h3 className="text-lg font-bold">Academic Staff</h3>
//       <ul className="list-disc list-inside">
//         <li>Professors Emeritus</li>
//         <li>Professors</li>
//         <li>Associate Professors</li>
//         <li>Senior Lecturers</li>
//         <li>Lecturers</li>
//         <li>Assistant Lecturers</li>
//         <li>Tutorial Assistants</li>
//       </ul>
//       <h3 className="text-lg font-bold mt-4">Library Staff</h3>
//       <ul className="list-disc list-inside">
//         <li>Library Professors</li>
//         <li>Associate Library Professors</li>
//         <li>Senior Librarians</li>
//         <li>Assistant Librarians</li>
//       </ul>
//       <h3 className="text-lg font-bold mt-4">Research Staff</h3>
//       <ul className="list-disc list-inside">
//         <li>Research Professors</li>
//         <li>Associate Research Professors</li>
//         <li>Senior Research Fellows</li>
//         <li>Research Fellows</li>
//         <li>Assistant Research Fellows</li>
//       </ul>

//       <table className="mt-6 w-full table-auto border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">No.</th>
//             <th className="border px-4 py-2">Position</th>
//             <th className="border px-4 py-2">Qualifications</th>
//             <th className="border px-4 py-2">Min. Publication Points</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border px-4 py-2">1</td>
//             <td className="border px-4 py-2">Tutorial Assistant</td>
//             <td className="border px-4 py-2">Bachelor’s degree of GPA 3.5+</td>
//             <td className="border px-4 py-2">2</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">2</td>
//             <td className="border px-4 py-2">Assistant Lecturer</td>
//             <td className="border px-4 py-2">Master’s degree with GPA 4.0+</td>
//             <td className="border px-4 py-2">4</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">3</td>
//             <td className="border px-4 py-2">Lecturer</td>
//             <td className="border px-4 py-2">PhD or equivalent degree</td>
//             <td className="border px-4 py-2">6</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">4</td>
//             <td className="border px-4 py-2">Senior Lecturer</td>
//             <td className="border px-4 py-2">2+ yrs as Lecturer, 5 publications</td>
//             <td className="border px-4 py-2">8</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">5</td>
//             <td className="border px-4 py-2">Associate Professor</td>
//             <td className="border px-4 py-2">3+ yrs as Senior Lecturer, 7 publications</td>
//             <td className="border px-4 py-2">10</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">6</td>
//             <td className="border px-4 py-2">Professor</td>
//             <td className="border px-4 py-2">5+ yrs as Associate Professor, 10 publications</td>
//             <td className="border px-4 py-2">12</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CategoryCriteria;



import React from 'react';

const CategoryCriteria = () => {
  const criteria = [
    {
      category: "Lecturer to Senior Lecturer",
      requirements: [
        "Minimum 3 years as Lecturer",
        "At least 5 publications in peer-reviewed journals",
        "Positive teaching evaluations",
        "Evidence of community service"
      ]
    },
    {
      category: "Senior Lecturer to Associate Professor",
      requirements: [
        "Minimum 4 years as Senior Lecturer",
        "At least 8 publications in peer-reviewed journals",
        "Evidence of research leadership",
        "Successful supervision of postgraduate students"
      ]
    },
    {
      category: "Associate Professor to Professor",
      requirements: [
        "Minimum 5 years as Associate Professor",
        "At least 12 publications in peer-reviewed journals",
        "National/international recognition in field",
        "Significant contribution to university development"
      ]
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2>SUZA Promotion Criteria</h2>
      <p style={{ marginBottom: '20px' }}>
        These are the standard promotion criteria for academic staff at SUZA.
      </p>

      {criteria.map((item, index) => (
        <div key={index} style={{ 
          marginBottom: '30px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          padding: '20px',
          backgroundColor: '#f8f9fa'
        }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0 }}>{item.category}</h3>
          <ul>
            {item.requirements.map((req, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>{req}</li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ 
        backgroundColor: '#e3f2fd',
        padding: '15px',
        borderRadius: '5px',
        marginTop: '30px'
      }}>
        <h4>Notes:</h4>
        <ul>
          <li>All publications must be from the current rank</li>
          <li>External reviewers will assess research quality</li>
          <li>Teaching portfolio required for all promotions</li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryCriteria;