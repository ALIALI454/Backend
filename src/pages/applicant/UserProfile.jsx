// src/pages/applicant/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './UserProfile.css'; // Import the custom CSS file

const UserProfile = () => {
  const { user, updateUserProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profileImage: null, // for image file
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        profileImage: null, // reset on load
      });
      setImagePreview(user.profileImageUrl || null);
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Jina linahitajika.';
    if (!formData.email.trim()) newErrors.email = 'Barua pepe inahitajika.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Barua pepe si sahihi.';

    if (formData.phone.trim()) {
      // Simple phone validation (can be enhanced)
      if (!/^\+?\d{7,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
        newErrors.phone = 'Namba ya simu si sahihi.';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, profileImage: 'Tafadhali chagua picha halali.' }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));

      setErrors((prev) => ({ ...prev, profileImage: '' }));

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setMessage('');
    try {
      // Prepare data to send, you might want to handle file upload differently depending on backend
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        profileImage: formData.profileImage,
      };

      await updateUserProfile(payload);

      setMessage('Profaili imesasishwa kwa mafanikio.');
      setLoading(false);
    } catch (error) {
      setMessage('Kosa lilitokea. Jaribu tena baadaye.');
      setLoading(false);
    }
  };

  return (
    <div className="user-profile-container">
      <h2 className="profile-title">Wasifu Wangu</h2>

      {message && (
        <p className={`profile-message ${message.includes('Kosa') ? 'error' : 'success'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="profile-form" noValidate>
        {/* Profile Image */}
        <div className="form-group image-upload-group">
          <label className="form-label">Picha ya Profaili</label>
          <div className="image-preview-area">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="profile-image-preview"
              />
            ) : (
              <div className="no-image-placeholder">
                Hakuna Picha
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          {errors.profileImage && <p className="error-message">{errors.profileImage}</p>}
        </div>

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Jina Kamili <span className="required-star">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Barua Pepe <span className="required-star">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Namba ya Simu
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-input ${errors.phone ? 'input-error' : ''}`}
            placeholder="+255 7XX XXX XXX"
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`submit-button ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Inahifadhi...' : 'Hifadhi Mabadiliko'}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;