import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { getEventDetails, registerForEvent } from '../../api/services/projectServices';

const EventRegistration = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        participantName: '',
        contactEmail: '',
        contactPhone: '',
        resumeLink: '',
        profileImage: null,
    });
    const [submitting, setSubmitting] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);


    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const data = await getEventDetails(eventId);
                setEvent(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };



const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setError(null);
  
  try {
    // Get user data from localStorage
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      throw new Error('User data not found. Please login again.');
    }

    const userData = JSON.parse(userDataString);
    const participantId = userData._id;
    
    if (!participantId) {
      throw new Error('User ID not found in user data.');
    }

    // Create the registration payload
    const registrationData = {
      participantId,
      participantName: formData.participantName || userData.userName,
      contactEmail: formData.contactEmail || userData.userEmail,
      contactPhone: formData.contactPhone || userData.userMobile,
      resumeLink: formData.resumeLink || userData.resume?.url || '',
      status: 'Pending'
    };

    // If there's a profile image, handle it separately
    if (formData.profileImage) {
      const imageFormData = new FormData();
      imageFormData.append('profileImage', formData.profileImage);
      
      // First upload the image
      const imageResponse = await uploadImage(imageFormData); // You'll need to implement this
      registrationData.profileImage = imageResponse.url;
    }

    // Send the registration data as JSON
    await registerForEvent(eventId, registrationData);
    setRegistrationSuccess(true);
  } catch (err) {
    setError(err.message || 'Registration failed. Please try again.');
  } finally {
    setSubmitting(false);
  }
};

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading event details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
                <h5>Error loading event</h5>
                <p>{error}</p>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="text-center py-5">
                <i className="fas fa-calendar fa-3x text-muted mb-3"></i>
                <h4>Event not found</h4>
                <p className="text-muted">The event you're looking for doesn't exist or may have been removed</p>
            </div>
        );
    }

    if (registrationSuccess) {
        return (
            <div className="text-center py-5">
                <div className="success-icon mb-4">
                    <i className="fas fa-check-circle fa-5x text-success"></i>
                </div>
                <h3>Registration Successful!</h3>
                <p className="lead">Thank you for registering for {event.title}</p>
                <p>We've sent a confirmation to {formData.contactEmail}</p>
                <div className="mt-4">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => navigate(`/events-details/${eventId}`)}
                    >
                        Back to Event
                    </button>
                    <Link to="/events" className="btn btn-outline-primary">
                        Browse More Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Sub Visual of the page */}
            <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
                <div className="container position-relative text-center">
                    <div className="row">
                        <div className="col-12">
                            <div className="subvisual-textbox">
                                <h1 className="text-primary mb-0">Register for {event.title}</h1>
                                <p>Complete the form below to register for this event</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <main className="jobplugin__main">
                <div className="jobplugin__main-holder">
                    <span className="jobplugin__pattern default-right"></span>
                    <span className="jobplugin__pattern default-left"></span>
                    <div className="jobplugin__visual-pattern">
                        <img src="/images/visual-pattern.png" alt="Image Description" />
                    </div>
                    <br />
                    <div className="jobplugin__container">
                        {/* User Box */}
                        <div className="jobplugin__userbox bg-light shadow">
                            <span className="jobplugin__userbox-bar jobplugin__bg-primary"></span>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h1 className="text-secondary h3">Registration Form</h1>
                            </div>
                            {/* Error message */}
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {/* User Box Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="jobplugin__form">
                                    {/* Participant Name */}
                                    <label htmlFor="participantName">&nbsp;&nbsp;Full Name</label>
                                    <div className="jobplugin__form-row">
                                        <div className="jobplugin__form-field">
                                            <input
                                                type="text"
                                                id="participantName"
                                                name="participantName"  // Fixed typo to match backend
                                                className="form-control"
                                                placeholder="Your full name"
                                                value={formData.participantName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Email */}
                                    <label htmlFor="contactEmail">&nbsp;&nbsp;Email Address</label>
                                    <div className="jobplugin__form-row">
                                        <div className="jobplugin__form-field">
                                            <input
                                                type="email"
                                                name="contactEmail"
                                                className="form-control"
                                                style={{ padding: '5px 30px' }}
                                                placeholder="Your email address"
                                                value={formData.contactEmail}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Phone */}
                                    <label htmlFor="contactPhone">&nbsp;&nbsp;Phone Number</label>
                                    <div className="jobplugin__form-row">
                                        <div className="jobplugin__form-field">
                                            <input
                                                type="tel"
                                                name="contactPhone"
                                                className="form-control"
                                                style={{ padding: '5px 30px' }}
                                                placeholder="Your phone number"
                                                value={formData.contactPhone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Resume Link */}
                                    <label htmlFor="resumeLink">&nbsp;&nbsp;Resume Link (URL)</label>
                                    <div className="jobplugin__form-row">
                                        <div className="jobplugin__form-field">
                                            <input
                                                type="url"
                                                name="resumeLink"
                                                className="form-control"
                                                style={{ padding: '5px 30px' }}
                                                placeholder="https://example.com/myresume.pdf"
                                                value={formData.resumeLink}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Profile Image */}
                                    <label htmlFor="profileImage">&nbsp;&nbsp;Profile Image (Optional)</label>
                                    <div className="jobplugin__form-row">
                                        <div className="jobplugin__form-field">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="profileImage"
                                                name="profileImage"
                                                onChange={handleChange}
                                                accept="image/*"
                                                style={{ padding: '5px 10px' }}
                                            />
                                        </div>
                                    </div>


                                </div>

                                {/* Submit Button */}
                                <div className="jobplugin__userbox-button">
                                    <button
                                        type="submit"
                                        className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Processing...' : 'Complete Registration'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br />
                </div>
            </main>
        </div>
    );
};

export default EventRegistration;