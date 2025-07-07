import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SubmitReview.css'; // Hii ni muhimu sana kwa CSS mpya!

const SubmitReview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Destructure state with default values to prevent errors if state is null
  const { application, feedback, message } = state || {};

  // Handle cases where data is missing (e.g., direct URL access)
  useEffect(() => {
    if (!state || !feedback) {
      // Redirect to dashboard with a message or log error
      navigate('/reviewer/dashboard', { replace: true, state: { error: 'Review data not found. Please resubmit.' } });
    }
  }, [state, feedback, navigate]);

  // If state or feedback is missing on initial render, show error message
  if (!state || !feedback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 main-container"> {/* Added main-container */}
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center error-card"> {/* Added error-card */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 error-icon"> {/* Added error-icon */}
            <svg className="h-10 w-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Review Data Not Found</h1>
          <p className="text-gray-600 mb-6">Please submit your review again from the application page.</p>
          <button
            onClick={() => navigate('/reviewer/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md primary-button error-button" /* Added primary-button, error-button */
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Destructure feedback properties with default values
  const { recommendation = 'No recommendation', comments = '', rating = 0, confidentialComments = '' } = feedback;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 main-container"> {/* Added main-container */}
      <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl w-full content-card"> {/* Added content-card */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 success-icon"> {/* Added success-icon */}
            <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Review Submitted!</h1>
          <p className="text-lg text-blue-600 font-medium message-text">{message}</p> {/* Added message-text */}
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8 border-l-4 border-blue-500 summary-section"> {/* Added summary-section */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4 summary-heading">Application Summary</h2> {/* Added summary-heading */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 summary-details"> {/* Added summary-details */}
            <div>
              <p className="text-sm text-gray-500">Applicant</p>
              <p className="font-medium text-gray-800">{application?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium text-gray-800">{application?.department || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Position Applied</p>
              <p className="font-medium text-gray-800">{application?.currentPosition || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Submission Date</p>
              <p className="font-medium text-gray-800">{application?.deadline || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-8 review-details-section"> {/* Added review-details-section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Recommendation</h3>
            <div className={`inline-flex items-center px-4 py-2 rounded-full recommendation-tag ${
                recommendation === 'approve' ? 'tag-approve' :
                recommendation === 'revise' ? 'tag-revise' :
                'tag-reject'
            }`}>
              {recommendation === 'approve' ? '✅ Approve' : recommendation === 'revise' ? '📝 Request Revision' : '❌ Reject'}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Rating</h3>
            <div className="flex items-center rating-section"> {/* Added rating-section */}
              <div className="flex mr-4 star-rating"> {/* Added star-rating */}
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl star ${
                      i < rating ? 'star-filled' : 'star-empty'
                    }`}
                  >
                    {i < rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-gray-700 font-medium rating-text">{rating} out of 5</span> {/* Added rating-text */}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Comments</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 comments-box"> {/* Added comments-box */}
              <p className="text-gray-700 whitespace-pre-line comments-text">{comments}</p> {/* Added comments-text */}
            </div>
          </div>

          {confidentialComments && (
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 confidential-comments-box"> {/* Added confidential-comments-box */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Confidential Comments</h3>
              <p className="text-gray-700 whitespace-pre-line confidential-text">{confidentialComments}</p> {/* Added confidential-text */}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 action-buttons"> {/* Added action-buttons */}
          <button
            onClick={() => navigate('/reviewer/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md primary-button" /* Added primary-button */
          >
            Return to Dashboard
          </button>
          <button
            onClick={() => navigate('/reviewer/feedback', { state: { application } })}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm secondary-button" /* Added secondary-button */
          >
            Edit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitReview;