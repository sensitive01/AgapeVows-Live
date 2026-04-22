import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewLayout from "./layout/NewLayout";
import {
    getUserById,
    verifyIdProof,
    verifyMobile,
} from "../../api/service/adminServices";

export default function AdminViewNewUser() {
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileCompletion, setProfileCompletion] = useState(0);

    // =========================
    // ✅ INFO ROW COMPONENT
    // =========================
    const InfoRow = ({ label, value }) => (
        <p>
            <strong>{label}:</strong> {value || "Not Provided"}
        </p>
    );

    // =========================
    // 🔥 FORMAT MOBILE NUMBER
    // =========================
    const formatMobile = (mobile) => {
        if (!mobile) return "Not Provided";
        return mobile.startsWith("+91") ? mobile : `+91-${mobile}`;
    };

    // =========================
    // 🔥 PROFILE COMPLETION
    // =========================
    const calculateProfileCompletion = (user) => {
        if (!user) return 0;

        // Define all profile fields grouped by section (matching client-side logic)
        const profileFields = {
            basic: [
                "profileCreatedFor",
                "userName",
                "dateOfBirth",
                "bodyType",
                "physicalStatus",
                "complexion",
                "height",
                "weight",
                "maritalStatus",
                "eatingHabits",
                "drinkingHabits",
                "smokingHabits",
                "motherTongue",
                "caste",
            ],
            married: [
                "marriedMonthYear",
                "livingTogetherPeriod",
                "childStatus",
                "numberOfChildren",
            ],
            divorced: ["divorcedMonthYear", "reasonForDivorce"],
            family: [
                "fathersName",
                "mothersName",
                "fathersOccupation",
                "fathersProfession",
                "mothersOccupation",
                "fathersNative",
                "mothersNative",
                "familyValue",
                "familyType",
                "familyStatus",
                "residenceType",
                "numberOfBrothers",
                "numberOfSisters",
            ],
            religious: [
                "religion",
                "denomination",
                "church",
                "churchActivity",
                "pastorsName",
                "spirituality",
                "religiousDetail",
            ],
            professional: [
                "education",
                "additionalEducation",
                "college",
                "educationDetail",
                "employmentType",
                "occupation",
                "position",
                "companyName",
                "annualIncome",
            ],
            contact: [
                "userMobile",
                "alternateMobile",
                "landlineNumber",
                "userEmail",
                "currentAddress",
                "permanentAddress",
                "city",
                "state",
                "pincode",
                "citizenOf",
                "contactPersonName",
                "relationship",
            ],
            lifestyle: [
                "hobbies",
                "interests",
                "music",
                "favouriteReads",
                "favouriteCuisines",
                "sportsActivities",
                "dressStyles",
            ],
            partners: [
                "partnerAgeFrom",
                "partnerAgeTo",
                "partnerHeight",
                "partnerMaritalStatus",
                "partnerMotherTongue",
                "partnerCaste",
                "partnerPhysicalStatus",
                "partnerEatingHabits",
                "partnerDrinkingHabits",
                "partnerSmokingHabits",
                "partnerDenomination",
                "partnerSpirituality",
                "partnerEducation",
                "partnerEmploymentType",
                "partnerOccupation",
                "partnerAnnualIncome",
                "partnerCountry",
                "partnerState",
                "partnerDistrict",
            ],
            profile: ["profileImage", "aboutMe"],
        };

        const isFieldFilled = (fieldValue) => {
            return (
                fieldValue !== null &&
                fieldValue !== undefined &&
                fieldValue !== "" &&
                (!Array.isArray(fieldValue) || fieldValue.length > 0)
            );
        };

        let filledCount = 0;
        let totalFields = 0;

        // Basic
        profileFields.basic.forEach((field) => {
            totalFields++;
            if (isFieldFilled(user[field])) filledCount++;
        });

        // Married fields logic
        if (
            user.maritalStatus &&
            user.maritalStatus !== "Never Married" &&
            user.maritalStatus !== "Unmarried"
        ) {
            profileFields.married.forEach((field) => {
                totalFields++;
                if (isFieldFilled(user[field])) filledCount++;
            });
        }

        // Divorced logic
        if (
            user.maritalStatus === "Divorced" ||
            user.maritalStatus === "Awaiting Divorce"
        ) {
            profileFields.divorced.forEach((field) => {
                totalFields++;
                if (isFieldFilled(user[field])) filledCount++;
            });
        }

        // Others
        const otherSections = ["family", "religious", "professional", "contact", "lifestyle", "partners", "profile"];
        otherSections.forEach(section => {
            profileFields[section].forEach((field) => {
                totalFields++;
                if (isFieldFilled(user[field])) filledCount++;
            });
        });

        return totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0;
    };

    // =========================
    // 🔥 FETCH USER
    // =========================
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserById(id);
                const userData = res?.data?.data;

                setUser(userData);

                const percentage = calculateProfileCompletion(userData);
                setProfileCompletion(percentage);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUser();
    }, [id]);

    if (loading)
        return <p className="text-center mt-4">Loading...</p>;

    if (!user)
        return <p className="text-center mt-4">User not found</p>;
    // Add this inside your AdminViewNewUser component, above the return
    const calculateAge = (dob) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const diff = Date.now() - birthDate.getTime();
        const ageDt = new Date(diff);
        return Math.abs(ageDt.getUTCFullYear() - 1970);
    };

    const handleVerifyId = async (status) => {
        if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this ID proof?`)) return;
        try {
            const res = await verifyIdProof(id, status);
            if (res.status === 200) {
                alert(`ID Proof ${status} successfully!`);
                setUser({ ...user, idVerificationStatus: status });
            }
        } catch (error) {
            console.error("Error verifying ID:", error);
            alert("Error updating status.");
        }
    };

    const handleVerifyMobile = async (isVerified) => {
        const action = isVerified ? "verify" : "unverify";
        if (!window.confirm(`Are you sure you want to ${action} this mobile number?`)) return;
        try {
            const res = await verifyMobile(id, isVerified);
            if (res.status === 200) {
                alert(`Mobile phone ${isVerified ? "verified" : "unverified"} successfully!`);
                setUser({ ...user, isPhoneVerified: isVerified });
            }
        } catch (error) {
            console.error("Error verifying mobile:", error);
            alert("Error updating status.");
        }
    };

    return (
        <NewLayout>
            {/* <div className="container mt-4 mb-5"> */}
            <div className="card shadow-lg p-4 border-0 rounded-4">

                {/* ================= PROFILE HEADER ================= */}
                <div className="text-center mb-4">
                    <img
                        src={user.profileImage || "/default-profile.png"}
                        alt="Profile"
                        style={{
                            width: "160px",
                            height: "160px",
                            objectFit: "cover",
                            borderRadius: "12px",
                            border: "3px solid #eee"
                        }}
                    />
                    <h4 className="mt-3">{user.userName}</h4>
                    <p className="text-green-600">{user.agwid}</p>
                    {/* PROFILE COMPLETION */}
                    <div className="mt-3">
                        <strong>{profileCompletion}% Profile Completed</strong>
                        <div className="progress mt-2" style={{ height: "8px" }}>
                            <div
                                className="progress-bar bg-success"
                                style={{ width: `${profileCompletion}%` }}
                            />
                        </div>
                    </div>
                </div>

                <hr />

                {/* ================= BASIC INFO ================= */}
                <h5 className="fw-bold mb-3">Basic Information</h5>
                <div className="row">
                    <div className="col-md-6">
                        <InfoRow label="Profile Created By" value={user.profileCreatedFor} />
                        <InfoRow label="Name" value={user.userName} />
                        <InfoRow label="Email" value={user.userEmail} />
                        <InfoRow label="Mobile" value={formatMobile(user.userMobile)} />
                        <InfoRow label="Gender" value={user.gender} />
                        <InfoRow
                            label="Age"
                            value={
                                user.dateOfBirth ? `${calculateAge(user.dateOfBirth)} years` : "Not Provided"
                            }
                        />
                        <InfoRow
                            label="Date of Birth"
                            value={
                                user.dateOfBirth
                                    ? new Date(user.dateOfBirth).toLocaleDateString()
                                    : "Not Provided"
                            }
                        />
                        <InfoRow label="Marital Status" value={user.maritalStatus} />
                    </div>



                    <div className="col-md-6">
                        <InfoRow label="Body Type" value={user.bodyType} />
                        <InfoRow label="Physical Status" value={user.physicalStatus} />
                        <InfoRow label="Complexion" value={user.complexion} />
                        <InfoRow label="Blood Group" value={user.bloodGroup} />
                        <InfoRow label="Mother Tongue" value={user.motherTongue} />
                        <InfoRow label="Country" value={user.country} />
                        <InfoRow label="State" value={user.state} />
                        <InfoRow label="City" value={user.city} />
                    </div>
                </div>
                <hr />

                <h5 className="fw-bold mb-3">Contact Information</h5>
<div className="row">
  <div className="col-md-6">
    <InfoRow label="Mobile Number" value={user.userMobile} />
    <InfoRow label="Alternate Mobile" value={user.alternateMobile} />
    <InfoRow label="Landline" value={user.landlineNumber} />
    <InfoRow label="Email" value={user.userEmail} />
    <InfoRow label="Current Address" value={user.currentAddress} />
    <InfoRow label="City" value={user.city} />
  </div>
  <div className="col-md-6">
    <InfoRow label="Permanent Address" value={user.permanentAddress} />
    <InfoRow label="State" value={user.state} />
    <InfoRow label="Pincode" value={user.pincode} />
    <InfoRow label="Citizen Of" value={user.citizenOf} />
    <InfoRow label="Contact Person" value={user.contactPersonName} />
    <InfoRow label="Relationship" value={user.relationship} />
  </div>
</div>

<hr />

                {/* ================= ABOUT ================= */}
                <h5 className="fw-bold mb-3">About Me</h5>
                <p>{user.aboutMe || "No description available"}</p>

                <hr />

                {/* ================= FAMILY ================= */}
                <h5 className="fw-bold mb-3">Family Details</h5>
                <div className="row">
                    <div className="col-md-6">
                        <InfoRow label="Father's Name" value={user.fathersName} />
                        <InfoRow label="Father's Occupation" value={user.fathersOccupation} />
                        <InfoRow label="Father's Profession" value={user.fathersProfession} />
                        <InfoRow label="Father's Native" value={user.fathersNative} />
                        <InfoRow label="No. of Brothers" value={user.numberOfBrothers} />
                         <InfoRow label="No. of Sisters" value={user.numberOfSisters} />
                        <InfoRow label="Family Type" value={user.familyType} />

                    </div>

                    <div className="col-md-6">
                        <InfoRow label="Residence Type" value={user.residenceType} />
                        <InfoRow label="Mother's Name" value={user.mothersName} />
                        <InfoRow label="Mother's Occupation" value={user.mothersOccupation} />
                        <InfoRow label="Mother's Native" value={user.mothersNative} />
                        <InfoRow label="Family Value" value={user.familyValue} />
                        <InfoRow label="Family Status" value={user.familyStatus} />
                       
                    </div>

                    <hr />

                    {/* ================= PROFESSIONAL INFORMATION ================= */}
                    <h5 className="fw-bold mb-3">Professional Information</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <InfoRow label="Education" value={user.education} />
                            <InfoRow label="Additional Education" value={user.additionalEducation} />
                            <InfoRow label="College/Institution" value={user.college} />
                            <InfoRow label="Education in Detail" value={user.educationDetail} />
                            <InfoRow label="Employment Type" value={user.employmentType} />
                           
                        </div>
                        <div className="col-md-6">
                            <InfoRow label="Occupation" value={user.occupation} />
                            <InfoRow label="Position" value={user.position} />
                            <InfoRow label="Company Name" value={user.companyName} />
                            <InfoRow label="Annual Income" value={user.annualIncome} />
                             <InfoRow label="Religious Detail" value={user.religiousDetail} />
                        </div>
                    </div>
                    <hr />

                    {/* ================= RELIGIOUS ================= */}
                    <h5 className="fw-bold mb-3">Religious Information</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <InfoRow label="Religion Detail" value={user.religiousDetail} />
                            <InfoRow label="Denomination" value={user.denomination} />
                            <InfoRow label="Caste" value={user.caste} />
                        </div>
                        <div className="col-md-6">
                            <InfoRow label="Church" value={user.church} />
                            <InfoRow label="Spirituality" value={user.spirituality} />
                            <InfoRow label="Pastor Name" value={user.pastorsName} />
                        </div>
                    </div>

                    <hr />

                    {/* ================= LIFESTYLE ================= */}
                    <h5 className="fw-bold mb-3">Lifestyle & Hobbies</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <InfoRow label="Eating Habits" value={user.eatingHabits} />
                            <InfoRow label="Drinking" value={user.drinkingHabits} />
                            <InfoRow label="Smoking" value={user.smokingHabits} />
                        </div>
                        <div className="col-md-6">
                            <InfoRow label="Exercise" value={user.exercise} />
                            <InfoRow
                                label="Hobbies"
                                value={
                                    user.hobbies?.length > 0
                                        ? user.hobbies.join(", ")
                                        : "Not Provided"
                                }
                            />
                            <InfoRow label="Interests" value={user.interests} />
                        </div>
                    </div>

                    <hr />

                    {/* ================= PARTNER PREFERENCES ================= */}
                   <h5 className="fw-bold mb-3">Partner Preferences</h5>

{/* Basic & Religious */}
<div className="row mb-3">
  <div className="col-md-6">
    <InfoRow
      label="Age Range"
      value={
        user.partnerAgeFrom && user.partnerAgeTo
          ? `${user.partnerAgeFrom} - ${user.partnerAgeTo} Years`
          : "Not Provided"
      }
    />
    <InfoRow
      label="Height"
      value={user.partnerHeight ? `${user.partnerHeight} cm` : "Not Provided"}
    />
    <InfoRow label="Marital Status" value={user.partnerMaritalStatus} />
    <InfoRow label="Mother Tongue" value={user.partnerMotherTongue} />
    <InfoRow label="Caste" value={user.partnerCaste} />
  </div>
  <div className="col-md-6">
    <InfoRow label="Physical Status" value={user.partnerPhysicalStatus} />
    <InfoRow label="Eating Habits" value={user.partnerEatingHabits} />
    <InfoRow label="Drinking Habits" value={user.partnerDrinkingHabits} />
    <InfoRow label="Smoking Habits" value={user.partnerSmokingHabits} />
    <InfoRow label="Denomination" value={user.partnerDenomination} />
   
  </div>
</div>

{/* Professional & Location */}
<div className="row mb-3">
  <div className="col-md-6">
    
    <InfoRow label="Education" value={user.partnerEducation} />
    <InfoRow label="Employment Type" value={user.partnerEmploymentType} />
    <InfoRow label="Occupation" value={user.partnerOccupation} />
    <InfoRow label="Annual Income" value={user.partnerAnnualIncome} />
  </div>
  <div className="col-md-6">
    <InfoRow label="Country" value={user.partnerCountry} />
    <InfoRow label="State" value={user.partnerState} />
    <InfoRow label="District" value={user.partnerDistrict} />
     <InfoRow label="Spirituality" value={user.partnerSpirituality} />
  </div>
</div>

<hr />

                    {/* ================= ID VERIFICATION ================= */}
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold m-0">Mobile Number Verification</h5>
                            <span className={`badge rounded-pill ${
                                user.isPhoneVerified ? 'bg-success' : 'bg-danger'
                            }`}>
                                {user.isPhoneVerified ? 'Verified' : 'Unverified'}
                            </span>
                        </div>
                        <div className="card border p-3 bg-light">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="mb-0"><strong>Mobile Number:</strong> {formatMobile(user.userMobile)}</p>
                                    <p className="mb-0 text-muted small">Verify after manual check or OTP.</p>
                                </div>
                                <button
                                    className={`btn ${user.isPhoneVerified ? 'btn-outline-danger' : 'btn-success'}`}
                                    onClick={() => handleVerifyMobile(!user.isPhoneVerified)}
                                >
                                    <i className={`fa ${user.isPhoneVerified ? 'fa-times' : 'fa-check'} me-1`}></i>
                                    {user.isPhoneVerified ? 'Unverify Mobile' : 'Verify Mobile'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <hr />

                    {/* ================= ID VERIFICATION ================= */}
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold m-0">Government ID Verification</h5>
                            <span className={`badge rounded-pill ${
                                user.idVerificationStatus === 'Verified' ? 'bg-success' :
                                user.idVerificationStatus === 'Rejected' ? 'bg-danger' :
                                user.idVerificationStatus === 'Uploaded' ? 'bg-warning text-dark' : 'bg-secondary'
                            }`}>
                                {user.idVerificationStatus || 'Pending'}
                            </span>
                        </div>

                        {user.idProofDocument ? (
                            <div className="card border p-3 bg-light">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <p className="mb-2"><strong>ID Document:</strong></p>
                                        <a
                                            href={user.idProofDocument}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            <i className="fa fa-eye me-2"></i> View Document
                                        </a>
                                    </div>
                                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                                        {user.idVerificationStatus !== 'Verified' && (
                                            <button
                                                className="btn btn-success me-2"
                                                onClick={() => handleVerifyId('Verified')}
                                            >
                                                <i className="fa fa-check me-1"></i> Approve
                                            </button>
                                        )}
                                        {user.idVerificationStatus !== 'Rejected' && (
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleVerifyId('Rejected')}
                                            >
                                                <i className="fa fa-times me-1"></i> Reject
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {user.idProofDocument.toLowerCase().endsWith('.pdf') ? (
                                    <div className="mt-3 text-center border p-4 bg-white rounded">
                                        <i className="fa fa-file-pdf-o text-danger font-large mb-2" style={{fontSize: '48px'}}></i>
                                        <p className="m-0 text-muted">PDF Document Attached</p>
                                    </div>
                                ) : (
                                    <div className="mt-3 text-center">
                                        <img
                                            src={user.idProofDocument}
                                            alt="ID Preview"
                                            className="img-fluid rounded border shadow-sm"
                                            style={{ maxHeight: '300px' }}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="alert alert-info py-2">
                                <i className="fa fa-info-circle me-2"></i> No ID proof uploaded yet.
                            </div>
                        )}
                    </div>

                    <hr />

                    {/* ================= SUBSCRIPTION ================= */}
                    <h5 className="fw-bold mb-3">Subscription Details</h5>

                    {user.paymentDetails?.length > 0 ? (
                        user.paymentDetails.map((plan) => (
                            <div
                                key={plan._id}
                                className="card p-3 mb-3 shadow-sm border-0 rounded-3"
                            >
                                <div className="row">
                                    <div className="col-md-6">
                                        <InfoRow label="Plan" value={plan.subscriptionType} />
                                        <p>
                                            <strong>Status:</strong>
                                            <span className="badge bg-success ms-2">
                                                {plan.subscriptionStatus}
                                            </span>
                                        </p>
                                        <InfoRow label="Amount" value={`₹${plan.subscriptionAmount}`} />
                                    </div>
                                    <div className="col-md-6">
                                        <InfoRow
                                            label="From"
                                            value={
                                                new Date(plan.subscriptionValidFrom).toLocaleDateString()
                                            }
                                        />
                                        <InfoRow
                                            label="To"
                                            value={
                                                new Date(plan.subscriptionValidTo).toLocaleDateString()
                                            }
                                        />
                                        <InfoRow
                                            label="Txn ID"
                                            value={plan.subscriptionTransactionId}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No subscription taken</p>
                    )}

                </div>
            </div>
        </NewLayout>
    );
}