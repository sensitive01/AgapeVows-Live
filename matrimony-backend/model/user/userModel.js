const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
   {
      /* =========================
         AUTH & BASIC ACCOUNT
      ========================== */
      userName: { type: String, required: true, trim: true },
      userEmail: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
      },
      userMobile: { type: String, required: true, unique: true, trim: true },
      userPassword: { type: String, required: true },
      agwid: { type: String, unique: true, index: true },

      isTermsAggreed: { type: Boolean, default: false },
      aboutMe: { type: String },

      isEmailVerified: { type: Boolean, default: false },
      isPhoneVerified: { type: Boolean, default: false },
      isApproved: { type: Boolean, default: false },
      isProfileCompleted: { type: Boolean, default: false },

      profileStatus: { type: String, default: "Pending" },
      profileVisibility: {
         type: String,
         enum: ["Public", "Private"],
         default: "Private",
      },

      /* =========================
         ID VERIFICATION
      ========================== */
      idProofDocument: { type: String, default: "" },
      idVerificationStatus: {
         type: String,
         enum: ["Pending", "Uploaded", "Verified", "Rejected"],
         default: "Pending",
      },

      /* =========================
         BASIC PERSONAL DETAILS
      ========================== */
      profileCreatedFor: {
         type: String,
         enum: ["Self", "Son", "Daughter", "Brother", "Sister", "Friend", "Relative"],
      },

      gender: { type: String, enum: ["Male", "Female", "Other"] },
      dateOfBirth: { type: Date },
      age: { type: Number }, // (can be derived later)

      bodyType: { type: String },
      physicalStatus: { type: String },
      complexion: { type: String },

      height: { type: String },
      weight: { type: String },

      maritalStatus: { type: String },
      marriedMonthYear: { type: String },
      livingTogetherPeriod: { type: String },
      divorcedMonthYear: { type: String },
      reasonForDivorce: { type: String },

      childStatus: { type: String },
      numberOfChildren: { type: String },

      motherTongue: { type: String },
      caste: { type: String },

      /* =========================
         LIFESTYLE
      ========================== */
      eatingHabits: { type: String },
      drinkingHabits: { type: String },
      smokingHabits: { type: String },

      diet: { type: String },       // keep existing for compatibility
      smoking: { type: String },
      drinking: { type: String },
      exercise: { type: String },

      hobbies: [{ type: String }],

      interests: { type: String },
      music: { type: String },
      favouriteReads: { type: String },
      favouriteCuisines: { type: String },
      sportsActivities: { type: String },
      dressStyles: { type: String },

      /* =========================
         FAMILY DETAILS
      ========================== */
      fathersName: { type: String, trim: true },
      mothersName: { type: String, trim: true },

      fathersOccupation: { type: String },
      fathersProfession: { type: String },
      mothersOccupation: { type: String },

      fathersNative: { type: String },
      mothersNative: { type: String },

      familyValue: { type: String },
      familyType: { type: String },
      familyStatus: { type: String },
      residenceType: { type: String },

      numberOfBrothers: { type: String },
      numberOfSisters: { type: String },

      /* =========================
         RELIGIOUS DETAILS
      ========================== */
      religion: { type: String }, // existing

      denomination: { type: String },
      church: { type: String },
      churchActivity: { type: String },
      pastorsName: { type: String },
      spirituality: { type: String },
      religiousDetail: { type: String },

      /* =========================
         CONTACT DETAILS
      ========================== */
      whatsapp: { type: String },
      facebook: { type: String },
      instagram: { type: String },
      x: { type: String },
      youtube: { type: String },
      linkedin: { type: String },
      alternateMobile: { type: String },
      landlineNumber: { type: String },

      address: { type: String }, // legacy
      currentAddress: { type: String },
      permanentAddress: { type: String },

      city: { type: String, trim: true },
      state: { type: String },
      pincode: { type: String },

      contactPersonName: { type: String },
      relationship: { type: String },
      citizenOf: { type: String },

      /* =========================
         EDUCATION & PROFESSION
      ========================== */
      education: { type: String },
      additionalEducation: { type: String },
      educationDetail: { type: String },

      degree: { type: String }, // legacy
      school: { type: String },
      college: { type: String },

      employmentType: { type: String },
      occupation: { type: String },
      position: { type: String },

      jobType: { type: String }, // legacy
      companyName: { type: String },

      annualIncome: { type: String },
      salary: { type: String }, // legacy
      jobExperience: { type: String },

      /* =========================
         PARTNER PREFERENCES
      ========================== */
      partnerAgeFrom: { type: String },
      partnerAgeTo: { type: String },
      partnerHeight: { type: String },

      partnerMaritalStatus: { type: String },
      partnerMotherTongue: { type: String },
      partnerCaste: { type: String },
      partnerPhysicalStatus: { type: String },

      partnerEatingHabits: { type: String },
      partnerDrinkingHabits: { type: String },
      partnerSmokingHabits: { type: String },

      partnerDenomination: { type: String },
      partnerSpirituality: { type: String },

      partnerEducation: { type: String },
      partnerEmploymentType: { type: String },
      partnerOccupation: { type: String },
      partnerAnnualIncome: { type: String },

      partnerCountry: { type: String },
      partnerState: { type: String },
      partnerDistrict: { type: String },

      /* =========================
         SUBSCRIPTION & PAYMENTS
      ========================== */
      isAnySubscriptionTaken: { type: Boolean, default: false },

      paymentDetails: [
         {
            subscriptionValidFrom: Date,
            subscriptionValidTo: Date,
            subscriptionType: String,
            subscriptionAmount: Number,
            subscriptionStatus: {
               type: String,
               default: "Active",
            },

            // ✅ ADD THIS
            cancelReason: String,
            cancelMessage: String,

            subscriptionTransactionDate: Date,
            subscriptionTransactionId: String,
            subscriptionOrderId: {
               type: String,
               required: true,
            },
            isEmployeeAssisted: { type: Boolean, default: false },
            assistedEmployeeId: String,
            assistedEmployeeName: String,
            maxProfiles: { type: mongoose.Schema.Types.Mixed, default: 0 },
            profilesViewedCount: { type: Number, default: 0 },
            dailyLimit: { type: mongoose.Schema.Types.Mixed, default: 0 },
            dailyViewedCount: { type: Number, default: 0 },
            lastViewDate: { type: Date },
            canViewProfiles: { type: String },
            viewContactDetails: { type: String },
            sendInterestRequest: { type: String },
            startChat: { type: String },
         },
      ],

      /* =========================
   SOFT DELETE
========================== */
      isDeleted: {
         type: Boolean,
         default: false,
      },
      deletedAt: {
         type: Date,
         default: null,
      },

      /* =========================
         MEDIA
      ========================== */
      profileImage: { type: String },
      additionalImages: [{ type: String }],
      selfIntroductionVideo: {
         type: String,
         default: "",
      },
      profileViews: [{ type: String }],
      blockedUsers: [{
         user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
         blockedAt: { type: Date, default: Date.now }
      }],
   },
   { timestamps: true }
);

module.exports = mongoose.model("UserModel", userSchema);