import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NewLayout from "./layout/NewLayout";
import {
    getUserById,
    verifyIdProof,
    verifyMobile,
} from "../../api/service/adminServices";
import { confirmAction, showAlert } from "../../utils/alertService";

export default function AdminViewNewUser({ previewUser }) {
    const { id } = useParams();
    const isPreview = !!previewUser;

    const [user, setUser] = useState(previewUser || null);
    const [loading, setLoading] = useState(!previewUser);
    const [profileCompletion, setProfileCompletion] = useState(0);

    // =========================
    // ✅ INFO ROW COMPONENT
    // =========================
    const InfoRow = ({ label, value }) => {
        let displayValue = value;
        if (Array.isArray(value)) {
            displayValue = value.length > 0 ? value.join(', ') : null;
        }

        const isSerializedAddress = typeof displayValue === "string" && displayValue.includes("|||");

        if (isSerializedAddress) {
            const rawParts = String(displayValue).split("|||");
            const doorNo = rawParts[0]?.trim();
            const locality = rawParts[1]?.trim();
            const country = rawParts[2]?.trim();
            const state = rawParts[3]?.trim();
            const district = rawParts[4]?.trim();
            const pincode = rawParts[5]?.trim();

            return (
                <div className="mb-3 p-3 bg-white rounded border">
                    <h6 className="fw-bold mb-3 text-secondary border-bottom pb-2">{label}</h6>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <strong>Door / Flat No, Street:</strong> <br /> {doorNo || "Not Provided"}
                        </div>
                        <div className="col-12 mb-2">
                            <strong>Locality / Area:</strong> <br /> {locality || "Not Provided"}
                        </div>
                        <div className="col-12 mb-2">
                            <strong>Country:</strong> <br /> {country || "Not Provided"}
                        </div>
                        <div className="col-12 mb-2">
                            <strong>State:</strong> <br /> {state || "Not Provided"}
                        </div>
                        <div className="col-12 mb-2">
                            <strong>District:</strong> <br /> {district || "Not Provided"}
                        </div>
                        <div className="col-12 mb-2">
                            <strong>Pincode:</strong> <br /> {pincode || "Not Provided"}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <p>
                <strong>{label}:</strong> {displayValue || "Not Provided"}
            </p>
        );
    };

    // =========================
    // 🔥 FORMAT MOBILE NUMBER
    // =========================
    const formatMobile = (mobile) => {
        if (!mobile) return "Not Provided";
        let mobStr = String(mobile);
        if (mobStr.startsWith("+91-")) return mobStr;
        if (mobStr.startsWith("+91")) return `+91-${mobStr.substring(3)}`;
        if (mobStr.startsWith("91") && mobStr.length === 12) return `+91-${mobStr.substring(2)}`;
        return `+91-${mobStr}`;
    };

    // =========================
    // 🔥 FORMAT DATE
    // =========================
    const formatDateDDMMYYYY = (dateString) => {
        if (!dateString) return "Not Provided";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
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
        if (isPreview) {
            setProfileCompletion(calculateProfileCompletion(previewUser));
            return;
        }

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
    }, [id, isPreview, previewUser]);

    if (loading) {
        const loadingContent = <p className="text-center mt-4">Loading...</p>;
        return isPreview ? loadingContent : <NewLayout>{loadingContent}</NewLayout>;
    }

    if (!user) {
        const errorContent = <p className="text-center mt-4">User not found</p>;
        return isPreview ? errorContent : <NewLayout>{errorContent}</NewLayout>;
    }
    // Add this inside your AdminViewNewUser component, above the return
    const calculateAge = (dob) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const diff = Date.now() - birthDate.getTime();
        const ageDt = new Date(diff);
        return Math.abs(ageDt.getUTCFullYear() - 1970);
    };

    const handleVerifyId = async (status) => {
        const confirmed = await confirmAction({
            title: `${status} ID Proof?`,
            text: `Are you sure you want to ${status.toLowerCase()} this ID proof?`,
            icon: "warning",
            confirmButtonText: `Yes, ${status}`,
        });

        if (!confirmed) return;

        try {
            const res = await verifyIdProof(id, status);
            if (res.status === 200) {
                showAlert({
                    title: "Success",
                    text: `ID Proof ${status} successfully!`,
                    icon: "success",
                });
                setUser({ ...user, idVerificationStatus: status });
            }
        } catch (error) {
            console.error("Error verifying ID:", error);
            showAlert({
                title: "Error",
                text: "Error updating status.",
                icon: "error",
            });
        }
    };

    const handleVerifyMobile = async (isVerified) => {
        const action = isVerified ? "verify" : "unverify";
        const confirmed = await confirmAction({
            title: `${isVerified ? "Verify" : "Unverify"} Mobile?`,
            text: `Are you sure you want to ${action} this mobile number?`,
            icon: "warning",
            confirmButtonText: `Yes, ${isVerified ? "Verify" : "Unverify"}`,
        });

        if (!confirmed) return;

        try {
            const res = await verifyMobile(id, isVerified);
            if (res.status === 200) {
                showAlert({
                    title: "Success",
                    text: `Mobile phone ${isVerified ? "verified" : "unverified"} successfully!`,
                    icon: "success",
                });
                setUser({ ...user, isPhoneVerified: isVerified });
            }
        } catch (error) {
            console.error("Error verifying mobile:", error);
            showAlert({
                title: "Error",
                text: "Error updating status.",
                icon: "error",
            });
        }
    };

    const content = (
        <div className="card shadow-lg p-4 border-0 rounded-4 position-relative">
            {/* ================= EDIT PROFILE BUTTON ================= */}
            {!isPreview && (
                <div className="position-absolute" style={{ top: "20px", right: "20px" }}>
                    <Link to={`/admin/edit-user/${id}`} className="btn btn-primary shadow-sm rounded-pill px-4">
                        <i className="fa fa-edit me-2"></i>
                        Edit Profile
                    </Link>
                </div>
            )}

            {/* ================= PROFILE HEADER ================= */}
            <div className="text-center mb-4">
                <img
                    src={user.profileImage || "https://ui-avatars.com/api/?name=User&background=e5e7eb&color=374151"}
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
                    <InfoRow label="Primary Mobile" value={user.userMobile} />
                    <InfoRow label="Primary Email" value={user.userEmail} />
                    <InfoRow label="Age" value={user.age ? `${user.age} Years` : "Not Provided"} />
                    <InfoRow
                        label="DOB"
                        value={formatDateDDMMYYYY(user.dateOfBirth)}
                    />
                    <InfoRow label="Height" value={user.height} />
                    <InfoRow label="Weight" value={user.weight} />
                    <InfoRow label="Physical Status" value={user.physicalStatus} />
                </div>

                <div className="col-md-6">
                    <InfoRow label="Marital Status" value={user.maritalStatus} />
                    <InfoRow label="Eating Habits" value={user.eatingHabits} />
                    <InfoRow label="Drinking" value={user.drinkingHabits} />
                    <InfoRow label="Smoking" value={user.smokingHabits} />
                    <InfoRow label="Mother Tongue" value={user.motherTongue} />
                    <InfoRow label="Gender" value={user.gender} />
                </div>
            </div>
            <hr />

            <h5 className="fw-bold mb-3">Contact Information</h5>
            <div className="row">
                <div className="col-md-6">
                    <InfoRow label="Contact Person" value={user.contactPersonName} />
                    <InfoRow label="Alternate Mobile" value={user.contactPhone} />
                    <InfoRow label="Current Address" value={user.currentAddress} />
                    <InfoRow label="Citizen Of" value={user.citizenOf} />

                </div>
                <div className="col-md-6">
                    <InfoRow label="Relationship" value={user.relationship} />
                    <InfoRow label="Alternate Email" value={user.contactEmail} />
                    <InfoRow label="Permanent Address" value={user.permanentAddress} />
                    <InfoRow label="Landline" value={user.landlineNumber} />

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
                    <InfoRow label="Family Value" value={user.familyValue} />
                    <InfoRow label="Family Status" value={user.familyStatus} />
                    <InfoRow label="No. of Brothers" value={user.numberOfBrothers} />
                    <InfoRow label="No. of Sisters" value={user.numberOfSisters} />
                </div>

                <div className="col-md-6">
                    <InfoRow label="Mother's Name" value={user.mothersName} />
                    <InfoRow label="Mother's Occupation" value={user.mothersOccupation} />
                    <InfoRow label="Mother's Profession" value={user.mothersProfession} />
                    <InfoRow label="Mother's Native" value={user.mothersNative} />
                    <InfoRow label="Family Type" value={user.familyType} />
                    <InfoRow label="Residence Type" value={user.residenceType} />
                    <InfoRow label="Married Brothers" value={user.marriedBrothers} />
                    <InfoRow label="Married Sisters" value={user.marriedSisters} />
                </div>

                {user.familyDetails && (
                    <div className="col-12">
                        <InfoRow label="Additional Details" value={user.familyDetails} />
                    </div>
                )}

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
                    </div>
                </div>
                <hr />

                {/* ================= RELIGIOUS ================= */}
                <h5 className="fw-bold mb-3">Religious Information</h5>
                <div className="row">
                    <div className="col-md-6">
                        <InfoRow label="Denomination" value={user.denomination} />
                        <InfoRow label="Church Activity" value={user.churchActivity} />
                        <InfoRow label="Spirituality" value={user.spirituality} />
                    </div>
                    <div className="col-md-6">
                        <InfoRow label="Church" value={user.church} />
                        <InfoRow label="Pastor Name" value={user.pastorsName} />
                        <InfoRow label="Religious Detail" value={user.religiousDetail} />
                    </div>
                </div>

                <hr />

                {/* ================= LIFESTYLE ================= */}
                <h5 className="fw-bold mb-3">Lifestyle & Hobbies</h5>
                <div className="row">
                    <div className="col-md-6">
                        <InfoRow label="Hobbies" value={user.hobbies} />
                        <InfoRow label="Music" value={user.music} />
                        <InfoRow label="Favourite Cuisines" value={user.favouriteCuisines} />
                        <InfoRow label="Sports/Activities" value={user.sportsActivities} />
                    </div>
                    <div className="col-md-6">
                        <InfoRow label="Interests" value={user.interests} />
                        <InfoRow label="Favourite Reads" value={user.favouriteReads} />
                        <InfoRow label="Exercise" value={user.exercise} />
                        <InfoRow label="Dress Styles" value={user.dressStyles} />
                    </div>
                </div>

                <hr />

                {/* ================= PARTNER PREFERENCES ================= */}
                <h5 className="fw-bold mb-3">Partner Preferences</h5>

                {user.aboutPartner && (
                    <div className="mb-4">
                        <h6 className="fw-bold" style={{ color: "#5c2a9d", marginBottom: "4px" }}>About Partner</h6>
                        <p className="mb-0 text-dark">{user.aboutPartner}</p>
                    </div>
                )}

                <h6 className="fw-bold mb-3" style={{ color: "#5c2a9d", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "4px", height: "18px", background: "#5c2a9d", borderRadius: "2px" }}></span>
                    Basic & Religious
                </h6>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <InfoRow
                            label="Age Range"
                            value={
                                user.partnerAgeFrom && user.partnerAgeTo
                                    ? `${user.partnerAgeFrom} - ${user.partnerAgeTo} Years`
                                    : "Not Provided"
                            }
                        />
                        <InfoRow label="Marital Status" value={user.partnerMaritalStatus} />
                        <InfoRow label="Caste" value={user.partnerCaste} />
                        <InfoRow label="Eating Habits" value={user.partnerEatingHabits} />
                        <InfoRow label="Smoking Habits" value={user.partnerSmokingHabits} />
                        <InfoRow label="Spirituality" value={user.partnerSpirituality} />
                    </div>
                    <div className="col-md-6">
                        <InfoRow
                            label="Height"
                            value={user.partnerHeight ? `${user.partnerHeight} cm` : "Not Provided"}
                        />
                        <InfoRow label="Mother Tongue" value={user.partnerMotherTongue} />
                        <InfoRow label="Physical Status" value={user.partnerPhysicalStatus} />
                        <InfoRow label="Drinking Habits" value={user.partnerDrinkingHabits} />
                        <InfoRow label="Denomination" value={user.partnerDenomination} />
                    </div>
                </div>

                <h6 className="fw-bold mb-3" style={{ color: "#5c2a9d", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "4px", height: "18px", background: "#5c2a9d", borderRadius: "2px" }}></span>
                    Professional & Location
                </h6>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <InfoRow label="Education" value={user.partnerEducation} />
                        <InfoRow label="Occupation" value={user.partnerOccupation} />
                        <InfoRow label="Country" value={user.partnerCountry} />
                        <InfoRow label="District" value={user.partnerDistrict} />
                    </div>
                    <div className="col-md-6">
                        <InfoRow label="Employment Type" value={user.partnerEmploymentType} />
                        <InfoRow
                            label="Annual Income"
                            value={user.partnerAnnualIncomeFrom || user.partnerAnnualIncomeTo
                                ? `${user.partnerAnnualIncomeFrom || "Any"} - ${user.partnerAnnualIncomeTo || "Any"}`
                                : "Not Provided"
                            }
                        />
                        <InfoRow label="State" value={user.partnerState} />
                    </div>
                </div>

                {!isPreview && (
                    <>
                        <hr />

                        {/* ================= MOBILE VERIFICATION ================= */}
                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold m-0">Mobile Number Verification</h5>
                                <span className={`badge rounded-pill ${user.isPhoneVerified ? 'bg-success' : 'bg-danger'
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
                                <span className={`badge rounded-pill ${user.idVerificationStatus === 'Verified' ? 'bg-success' :
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
                                                className="btn btn-outline-primary btn-sm mb-3"
                                            >
                                                <i className="fa fa-eye me-2"></i> View Document
                                            </a>
                                            <p className="mb-1"><strong>ID Type:</strong> {user.idProofType || "N/A"}</p>
                                            <p className="mb-2"><strong>ID Number:</strong> {user.idProofNumber || "N/A"}</p>
                                        </div>
                                        {!isPreview && (
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
                                        )}
                                    </div>
                                    {user.idProofDocument.toLowerCase().endsWith('.pdf') ? (
                                        <div className="mt-3 text-center border p-4 bg-white rounded">
                                            <i className="fa fa-file-pdf-o text-danger font-large mb-2" style={{ fontSize: '48px' }}></i>
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
                                    <div className="mt-3 text-center">
                                        {!isPreview && !previewUser && (
                                            <>
                                                {user.isPhoneVerified ? (
                                                    <button
                                                        className="btn btn-warning me-2 shadow-sm fw-bold"
                                                        onClick={() => handleVerifyMobile(false)}
                                                    >
                                                        <i className="fa fa-times me-2"></i> Unverify Phone
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-success me-2 shadow-sm fw-bold"
                                                        onClick={() => handleVerifyMobile(true)}
                                                    >
                                                        <i className="fa fa-check me-2"></i> Verify Phone
                                                    </button>
                                                )}
                                                {user.isActive ? (
                                                    <button
                                                        className="btn btn-danger shadow-sm fw-bold"
                                                        onClick={() => handleAccountStatus(false)}
                                                    >
                                                        <i className="fa fa-ban me-2"></i> Deactivate Account
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-success shadow-sm fw-bold"
                                                        onClick={() => handleAccountStatus(true)}
                                                    >
                                                        <i className="fa fa-check-circle me-2"></i> Activate Account
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
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
                                                    formatDateDDMMYYYY(plan.subscriptionValidFrom)
                                                }
                                            />
                                            <InfoRow
                                                label="To"
                                                value={
                                                    formatDateDDMMYYYY(plan.subscriptionValidTo)
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
                    </>
                )}

            </div>
        </div>
    );

    if (isPreview) {
        return content;
    }

    return (
        <NewLayout>
            {content}
        </NewLayout>
    );
}
