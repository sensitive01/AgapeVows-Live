import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaUpload,
  FaTrash,
  FaEdit,
  FaLink,
  FaFilePdf,
  FaChevronDown,
  FaPlay,
  FaStop,
  FaPlus,
  FaTimes,
  FaMicrophone,
  FaVideo,
} from "react-icons/fa";
import {
  getEmployeeDetails,
  updateEmployeeProfile,
} from "../../api/services/projectServices";
import axios from "axios";

const EmployeeerEditProfile = () => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    userName: "",
    userEmail: "",
    userMobile: "",
    profileImage: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    totalExperience: "",
    totalExperienceYears: "",
    totalExperienceMonths: "",
    expectedSalary: "",
    specialization: "",
    profilesummary: "",
    coverLetter: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    preferredLocation: "",
    linkedin: "",
    github: "",
    portfolio: "",
    skills: [],
    languages: [],
    gradeLevels: [],
    education: [],
    workExperience: [],
    resume: { url: "", name: "" },
    coverLetterFile: { url: "", name: "" },
    profileVideo: { url: "", name: "", thumbnail: "" },
    introductionAudio: { url: "", name: "", duration: 0 },
  });
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [profileVideoFile, setProfileVideoFile] = useState(null);
  const [introAudioFile, setIntroAudioFile] = useState(null);
  const [uploading, setUploading] = useState({
    profileImage: false,
    resume: false,
    coverLetter: false,
    video: false,
    audio: false,
  });
  const [uploadProgress, setUploadProgress] = useState({ video: 0, audio: 0 });
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newGradeLevel, setNewGradeLevel] = useState("");
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    type: "",
    startDate: "",
    endDate: "",
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
    description: "",
    grade: "",
  });
  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    employmentType: "",
    startDate: "",
    endDate: "",
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
    description: "",
    location: "",
  });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Recording states
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordingTimer, setRecordingTimer] = useState(0);

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const recordingVideoRef = useRef(null);
  const streamRef = useRef(null);

  const isFormDirty =
    initialData && JSON.stringify(employeeData) !== JSON.stringify(initialData);

  const inputStyle = {
    height: "45px",
    padding: "12px 16px",
    lineHeight: "1.5",
    borderRadius: "8px",
    border: "1px solid #e1e5e9",
    fontSize: "16px",
    transition: "all 0.2s ease",
  };

  const textareaStyle = {
    minHeight: "120px",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e1e5e9",
    fontSize: "16px",
    resize: "vertical",
    lineHeight: "1.6",
  };

  const selectStyle = {
    height: "45px",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e1e5e9",
    fontSize: "16px",
    background: "white",
    appearance: "none",
  };

  const labelStyle = {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "8px",
    color: "#333",
  };

  // Generate year and month options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Format date helper
  const formatYearMonth = (year, month) => {
    if (!year) return "";
    return month ? `${year}-${month}` : year;
  };

  // Recording timer effect
  useEffect(() => {
    let interval = null;
    if (isRecordingVideo || isRecordingAudio) {
      interval = setInterval(() => {
        setRecordingTimer((timer) => timer + 1);
      }, 1000);
    } else {
      setRecordingTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingVideo, isRecordingAudio]);

  // Format recording timer
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Start video recording
  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (recordingVideoRef.current) {
        recordingVideoRef.current.srcObject = stream;
        recordingVideoRef.current.play();
      }

      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        handleRecordedVideo(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      setMediaRecorder(recorder);
      setRecordedChunks(chunks);
      recorder.start();
      setIsRecordingVideo(true);
    } catch (err) {
      setError("Failed to start video recording: " + err.message);
    }
  };

  // Stop video recording
  const stopVideoRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsRecordingVideo(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  // Start audio recording
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        handleRecordedAudio(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      setMediaRecorder(recorder);
      setRecordedChunks(chunks);
      recorder.start();
      setIsRecordingAudio(true);
    } catch (err) {
      setError("Failed to start audio recording: " + err.message);
    }
  };

  // Stop audio recording
  const stopAudioRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsRecordingAudio(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  // Handle recorded video
  const handleRecordedVideo = async (blob) => {
    try {
      const file = new File([blob], `recorded_video_${Date.now()}.webm`, {
        type: "video/webm",
      });

      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("file", file);

      setUploading((prev) => ({ ...prev, video: true }));
      setUploadProgress((prev) => ({ ...prev, video: 0 }));

      const response = await axios.put(
        `${VITE_BASE_URL}/uploadprofilevideo/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            fileType: "profileVideo",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress((prev) => ({
              ...prev,
              video: percentCompleted,
            }));
          },
        }
      );

      setEmployeeData((prev) => ({
        ...prev,
        profileVideo: {
          name: file.name,
          url: response.data.file.url,
          thumbnail: response.data.file.thumbnail || "",
        },
      }));
    } catch (err) {
      setError("Failed to upload recorded video: " + err.message);
    } finally {
      setUploading((prev) => ({ ...prev, video: false }));
      setUploadProgress((prev) => ({ ...prev, video: 0 }));
    }
  };

  // Handle recorded audio
  const handleRecordedAudio = async (blob) => {
    try {
      const file = new File([blob], `recorded_audio_${Date.now()}.webm`, {
        type: "audio/webm",
      });

      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("file", file);

      // Get audio duration
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.onloadedmetadata = () => {
        setEmployeeData((prev) => ({
          ...prev,
          introductionAudio: {
            ...prev.introductionAudio,
            duration: Math.round(audio.duration),
          },
        }));
        URL.revokeObjectURL(audio.src);
      };

      setUploading((prev) => ({ ...prev, audio: true }));
      setUploadProgress((prev) => ({ ...prev, audio: 0 }));

      const response = await axios.put(
        `${VITE_BASE_URL}/uploadintroaudio/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            fileType: "audio",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress((prev) => ({
              ...prev,
              audio: percentCompleted,
            }));
          },
        }
      );

      setEmployeeData((prev) => ({
        ...prev,
        introductionAudio: {
          name: file.name,
          url: response.data.employee.introductionAudio.url,
          duration: prev.introductionAudio.duration || 0,
        },
      }));
    } catch (err) {
      setError("Failed to upload recorded audio: " + err.message);
    } finally {
      setUploading((prev) => ({ ...prev, audio: false }));
      setUploadProgress((prev) => ({ ...prev, audio: 0 }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }
        const data = await getEmployeeDetails(id, token);

        // Parse total experience
        let totalExpYears = "";
        let totalExpMonths = "";
        if (data.totalExperience) {
          const expMatch = data.totalExperience.match(
            /(\d+)\s*years?\s*(?:(\d+)\s*months?)?/i
          );
          if (expMatch) {
            totalExpYears = expMatch[1] || "";
            totalExpMonths = expMatch[2] || "";
          }
        }

        const formattedData = {
          ...data,
          profileImage: data.userProfilePic || "",
          totalExperienceYears: totalExpYears,
          totalExperienceMonths: totalExpMonths,
          resume: data.resume ? { ...data.resume } : { url: "", name: "" },
          coverLetterFile: data.coverLetterFile
            ? { ...data.coverLetterFile }
            : { url: "", name: "" },
          profileVideo: data.profileVideo
            ? { ...data.profileVideo }
            : { url: "", name: "", thumbnail: "" },
          introductionAudio: data.introductionAudio
            ? { ...data.introductionAudio }
            : { url: "", name: "", duration: 0 },
          skills: data.skills || [],
          languages: data.languages || [],
          gradeLevels: data.gradeLevels || [],
          education: data.education || [],
          workExperience: data.workExperience || [],
        };

        setEmployeeData(formattedData);
        setInitialData(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch employee data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle total experience change
  const handleTotalExperienceChange = (field, value) => {
    setEmployeeData((prev) => {
      const updated = { ...prev, [field]: value };

      // Update the combined totalExperience field
      const years = updated.totalExperienceYears;
      const months = updated.totalExperienceMonths;

      let totalExp = "";
      if (years || months) {
        if (years === "0" && months === "0") {
          totalExp = "Fresher";
        } else {
          if (years && years !== "0") {
            totalExp += `${years} year${years !== "1" ? "s" : ""}`;
          }
          if (months && months !== "0") {
            if (totalExp) totalExp += " ";
            totalExp += `${months} month${months !== "1" ? "s" : ""}`;
          }
        }
      }

      return { ...updated, totalExperience: totalExp };
    });
  };

  const handleAddSkill = () => {
    if (newSkill && !employeeData.skills.includes(newSkill)) {
      setEmployeeData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEmployeeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAddLanguage = () => {
    if (newLanguage && !employeeData.languages.includes(newLanguage)) {
      setEmployeeData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage],
      }));
      setNewLanguage("");
    }
  };

  const handleRemoveLanguage = (languageToRemove) => {
    setEmployeeData((prev) => ({
      ...prev,
      languages: prev.languages.filter(
        (language) => language !== languageToRemove
      ),
    }));
  };

  const handleAddGradeLevel = () => {
    if (newGradeLevel && !employeeData.gradeLevels.includes(newGradeLevel)) {
      setEmployeeData((prev) => ({
        ...prev,
        gradeLevels: [...prev.gradeLevels, newGradeLevel],
      }));
      setNewGradeLevel("");
    }
  };

  const handleRemoveGradeLevel = (gradeToRemove) => {
    setEmployeeData((prev) => ({
      ...prev,
      gradeLevels: prev.gradeLevels.filter((grade) => grade !== gradeToRemove),
    }));
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      const educationToAdd = {
        ...newEducation,
        startDate: formatYearMonth(
          newEducation.startYear,
          newEducation.startMonth
        ),
        endDate: formatYearMonth(newEducation.endYear, newEducation.endMonth),
      };

      setEmployeeData((prev) => ({
        ...prev,
        education: [...prev.education, educationToAdd],
      }));
      setNewEducation({
        degree: "",
        institution: "",
        type: "",
        startDate: "",
        endDate: "",
        startYear: "",
        startMonth: "",
        endYear: "",
        endMonth: "",
        description: "",
        grade: "",
      });
    }
  };

  const handleRemoveEducation = (indexToRemove) => {
    setEmployeeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleAddExperience = () => {
    if (newExperience.position && newExperience.company) {
      const experienceToAdd = {
        ...newExperience,
        startDate: formatYearMonth(
          newExperience.startYear,
          newExperience.startMonth
        ),
        endDate: formatYearMonth(newExperience.endYear, newExperience.endMonth),
      };

      setEmployeeData((prev) => ({
        ...prev,
        workExperience: [...prev.workExperience, experienceToAdd],
      }));
      setNewExperience({
        position: "",
        company: "",
        employmentType: "",
        startDate: "",
        endDate: "",
        startYear: "",
        startMonth: "",
        endYear: "",
        endMonth: "",
        description: "",
        location: "",
      });
    }
  };

  const handleRemoveExperience = (indexToRemove) => {
    setEmployeeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  // Document delete handlers
  const handleDeleteResume = async () => {
    if (window.confirm("Are you sure you want to delete your resume?")) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.delete(
          `${VITE_BASE_URL}/delete-resume/${id}`,

          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setEmployeeData((prev) => ({
            ...prev,
            resume: { url: "", name: "" },
          }));
        }
      } catch (err) {
        setError("Failed to delete resume");
      }
    }
  };

  const handleDeleteCoverLetter = async () => {
    if (window.confirm("Are you sure you want to delete your cover letter?")) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.delete(
          `${VITE_BASE_URL}/delete-cover-letter/${id}`,

          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setEmployeeData((prev) => ({
            ...prev,
            coverLetterFile: { url: "", name: "" },
          }));
        }
      } catch (err) {
        setError("Failed to delete cover letter");
      }
    }
  };

  const handleDeleteVideo = async () => {
    if (window.confirm("Are you sure you want to delete your profile video?")) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.delete(
          `${VITE_BASE_URL}/delete-profile-video-record/${id}`,

          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setEmployeeData((prev) => ({
            ...prev,
            profileVideo: { url: "", name: "", thumbnail: "" },
          }));
          setIsVideoPlaying(false);
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.src = "";
          }
        }
      } catch (err) {
        setError("Failed to delete video");
      }
    }
  };

  const handleDeleteAudio = async () => {
    if (
      window.confirm("Are you sure you want to delete your introduction audio?")
    ) {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.delete(
          `${VITE_BASE_URL}/delete-audio-record/${id}`,

          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setEmployeeData((prev) => ({
            ...prev,
            introductionAudio: { url: "", name: "", duration: 0 },
          }));
          setIsAudioPlaying(false);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
          }
        }
      } catch (err) {
        setError("Failed to delete audio");
      }
    }
  };

  const handleProfilePicChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setError(null);

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        setError(
          "Invalid Image format - kindly upload JPG, JPEG or PNG format images only"
        );
        e.target.value = "";
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setError("Image size should be less than 10MB");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setEmployeeData((prev) => ({
          ...prev,
          profileImage: event.target.result,
        }));
      };
      reader.readAsDataURL(file);

      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        setUploading((prev) => ({ ...prev, profileImage: true }));

        const response = await axios.put(
          `${VITE_BASE_URL}/uploadfile/${id}`,
          formData,
          {
            params: { fileType: "profileImage" },
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data?.file?.url) {
          setEmployeeData((prev) => ({
            ...prev,
            profileImage: response.data.file.url,
            userProfilePic: response.data.file.url,
          }));
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("Upload error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to upload image. Please try again."
        );
        setEmployeeData((prev) => ({
          ...prev,
          profileImage:
            initialData?.profileImage || initialData?.userProfilePic || "",
        }));
        e.target.value = "";
      } finally {
        setUploading((prev) => ({ ...prev, profileImage: false }));
      }
    }
  };

  const handleResumeChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setError(null);

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setError("File size should be less than 10MB");
        e.target.value = "";
        return;
      }

      setResumeFile(file);

      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        setUploading((prev) => ({ ...prev, resume: true }));

        let response;
        try {
          response = await axios.put(
            `${VITE_BASE_URL}/uploadfile/${id}?fileType=resume`,
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (firstError) {
          console.log("First endpoint failed, trying alternative format...");
          response = await axios.put(
            `${VITE_BASE_URL}/uploadfile/${id}`,
            formData,
            {
              params: { fileType: "resume" },
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        if (response.data?.file?.url && response.data?.file?.name) {
          setEmployeeData((prev) => ({
            ...prev,
            resume: {
              name: response.data.file.name,
              url: response.data.file.url,
            },
          }));
          setError(null);
        } else if (response.data?.url && response.data?.name) {
          setEmployeeData((prev) => ({
            ...prev,
            resume: {
              name: response.data.name,
              url: response.data.url,
            },
          }));
          setError(null);
        } else {
          console.log("Unexpected response structure:", response.data);
          throw new Error("Invalid response structure from server");
        }

        console.log("Resume uploaded successfully:", response.data);
      } catch (err) {
        console.error("Resume upload error:", err);
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Failed to upload resume. Please try again."
        );
        e.target.value = "";
      } finally {
        setUploading((prev) => ({ ...prev, resume: false }));
      }
    }
  };

  const handleCoverLetterChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverLetterFile(file);

      try {
        const token = localStorage.getItem("authToken");
        const formData = new FormData();
        formData.append("file", file);
        setUploading((prev) => ({ ...prev, coverLetter: true }));

        const response = await axios.put(
          `${VITE_BASE_URL}/uploadfile/${id}?fileType=coverLetter`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setEmployeeData((prev) => ({
          ...prev,
          coverLetterFile: {
            name: response.data.file.name,
            url: response.data.file.url,
          },
        }));
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to upload cover letter"
        );
      } finally {
        setUploading((prev) => ({ ...prev, coverLetter: false }));
      }
    }
  };

  const handleProfileVideoChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.match("video.*")) {
        setError("Please select a video file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Video size should be less than 10MB");
        return;
      }

      setProfileVideoFile(file);

      try {
        const token = localStorage.getItem("authToken");
        const formData = new FormData();
        formData.append("file", file);

        setUploading((prev) => ({ ...prev, video: true }));
        setUploadProgress((prev) => ({ ...prev, video: 0 }));

        const response = await axios.put(
          `${VITE_BASE_URL}/uploadprofilevideo/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
              fileType: "profileVideo",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress((prev) => ({
                ...prev,
                video: percentCompleted,
              }));
            },
          }
        );

        setEmployeeData((prev) => ({
          ...prev,
          profileVideo: {
            name: file.name,
            url: response.data.file.url,
            thumbnail: response.data.file.thumbnail || "",
          },
        }));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to upload video");
      } finally {
        setUploading((prev) => ({ ...prev, video: false }));
        setUploadProgress((prev) => ({ ...prev, video: 0 }));
      }
    }
  };

  const handleIntroAudioChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.match("audio.*")) {
        setError("Please select an audio file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Audio size should be less than 10MB");
        return;
      }

      setIntroAudioFile(file);

      try {
        const token = localStorage.getItem("authToken");
        const formData = new FormData();
        formData.append("file", file);

        const audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.onloadedmetadata = () => {
          setEmployeeData((prev) => ({
            ...prev,
            introductionAudio: {
              ...prev.introductionAudio,
              duration: Math.round(audio.duration),
            },
          }));
          URL.revokeObjectURL(audio.src);
        };

        setUploading((prev) => ({ ...prev, audio: true }));
        setUploadProgress((prev) => ({ ...prev, audio: 0 }));

        const response = await axios.put(
          `${VITE_BASE_URL}/uploadintroaudio/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
              fileType: "audio",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress((prev) => ({
                ...prev,
                audio: percentCompleted,
              }));
            },
          }
        );

        setEmployeeData((prev) => ({
          ...prev,
          introductionAudio: {
            name: file.name,
            url: response.data.employee.introductionAudio.url,
            duration: prev.introductionAudio.duration || 0,
          },
        }));

        e.target.value = "";
      } catch (err) {
        setError(err.response?.data?.message || "Failed to upload audio");
      } finally {
        setUploading((prev) => ({ ...prev, audio: false }));
        setUploadProgress((prev) => ({ ...prev, audio: 0 }));
      }
    }
  };

  const toggleAudioPlayback = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsAudioPlaying(true))
          .catch((e) => setError("Failed to play audio: " + e.message));
      } else {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }
    }
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => setIsVideoPlaying(true))
          .catch((e) => setError("Failed to play video: " + e.message));
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormDirty) {
      setError("No changes detected in form fields");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      await updateEmployeeProfile(id, employeeData, token);
      navigate("/employee-profile", {
        state: { success: "Profile updated successfully" },
      });
    } catch (err) {
      setError(err.message || "Failed to update profile");
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-light d-flex pt-60 pt-md-90 text-white"></div>
      <main className="jobplugin__main bg-light">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            {error && (
              <div
                className="alert alert-danger alert-dismissible fade show mb-4"
                role="alert"
              >
                {error}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError(null)}
                  aria-label="Close"
                ></button>
              </div>
            )}

            <div className="jobplugin__profile">
              <div className="jobplugin__profile-intro border border-dark shadow">
                <div className="jobplugin__profile-intro__left">
                  <div className="jobplugin__profile-intro__image border-primary">
                    <div className="jobplugin__profile-intro__avatar">
                      <img
                        src={
                          employeeData.profileImage ||
                          employeeData.userProfilePic ||
                          "images/img-profile.jpg"
                        }
                        alt={employeeData.userName}
                      />
                    </div>

                    <label
                      htmlFor="profilePicUpload"
                      className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                    >
                      {uploading.profileImage ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <FaUpload />
                      )}
                      <input
                        type="file"
                        id="profilePicUpload"
                        className="d-none"
                        onChange={handleProfilePicChange}
                        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                        disabled={uploading.profileImage}
                      />
                    </label>
                  </div>
                  <div className="jobplugin__profile-intro__Textbox">
                    <div className="jobplugin__profile-intro__info mb-0">
                      <h1 className="h5" style={{ fontSize: "18px" }}>
                        {employeeData.userName}
                      </h1>
                    </div>
                    <address
                      className="jobplugin__profile-intro__address"
                      style={{ fontSize: "16px" }}
                    >
                      {employeeData.currentCity ||
                        employeeData.city ||
                        "Location not specified"}
                    </address>
                    {employeeData.specialization && (
                      <div
                        className="jobplugin__profile-intro__specialization"
                        style={{ fontSize: "16px" }}
                      >
                        {employeeData.specialization}
                      </div>
                    )}
                  </div>
                </div>
                <div className="jobplugin__profile-intro__right">
                  <button
                    onClick={() => navigate(`/employee-profile`)}
                    className="jobplugin__button jobplugin__bg-white jobplugin__border-primary hover:jobplugin__bg-white small text-black"
                    style={{ fontSize: "16px", padding: "12px 20px" }}
                  >
                    <FaArrowLeft /> &nbsp; Back to Profile
                  </button>
                  <button
                    type="submit"
                    form="profileForm"
                    disabled={!isFormDirty}
                    className="jobplugin__button border-dark shadow bg-primary hover:jobplugin__bg-secondary small"
                    style={{ fontSize: "16px", padding: "12px 20px" }}
                  >
                    <FaSave /> &nbsp; Save Changes
                  </button>
                </div>
              </div>

              <form id="profileForm" onSubmit={handleSubmit}>
                <div className="jobplugin__profile-container">
                  <aside className="jobplugin__profile-aside">
                    <div className="jobplugin__profile-box border border-dark shadow">
                      <div className="jobplugin__profile-box__head">
                        <div className="jobplugin__profile-box__heading">
                          <h2 className="h5" style={{ fontSize: "18px" }}>
                            Contact Info
                          </h2>
                          <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                        </div>
                      </div>
                      <div className="jobplugin__profile-box__body">
                        <div className="form-group mb-3">
                          <label style={labelStyle}>Full Name*</label>
                          <input
                            type="text"
                            className="form-control"
                            name="userName"
                            value={employeeData.userName}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label style={labelStyle}>Email*</label>
                          <input
                            type="email"
                            className="form-control"
                            name="userEmail"
                            value={employeeData.userEmail}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label style={labelStyle}>Phone</label>
                          <input
                            type="tel"
                            className="form-control"
                            name="userMobile"
                            value={employeeData.userMobile || ""}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit mobile number"
                            style={inputStyle}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label style={labelStyle}>LinkedIn</label>
                          <input
                            type="url"
                            className="form-control"
                            name="linkedin"
                            value={employeeData.linkedin || ""}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/yourprofile"
                            style={inputStyle}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label style={labelStyle}>GitHub</label>
                          <input
                            type="url"
                            className="form-control"
                            name="github"
                            value={employeeData.github || ""}
                            onChange={handleChange}
                            placeholder="https://github.com/yourusername"
                            style={inputStyle}
                          />
                        </div>
                        <div className="form-group">
                          <label style={labelStyle}>Portfolio</label>
                          <input
                            type="url"
                            className="form-control"
                            name="portfolio"
                            value={employeeData.portfolio || ""}
                            onChange={handleChange}
                            placeholder="https://yourportfolio.com"
                            style={inputStyle}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-box border border-dark shadow">
                      <div className="jobplugin__profile-box__head">
                        <div className="jobplugin__profile-box__heading">
                          <h2 className="h5" style={{ fontSize: "18px" }}>
                            Documents
                          </h2>
                          <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                        </div>
                      </div>
                      <div className="jobplugin__profile-box__body">
                        <div className="form-group mb-3">
                          <label style={labelStyle}>Resume</label>
                          <div className="input-group">
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleResumeChange}
                              disabled={uploading.resume}
                              style={inputStyle}
                            />
                            {uploading.resume && (
                              <span className="input-group-text">
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              </span>
                            )}
                          </div>
                          {employeeData.resume?.name && (
                            <div className="mt-2 d-flex justify-content-between align-items-center">
                              <div>
                                <small
                                  className="text-muted d-block"
                                  style={{ fontSize: "14px" }}
                                >
                                  Current: {employeeData.resume.name}
                                </small>
                                {employeeData.resume?.url && (
                                  <small
                                    className="text-success"
                                    style={{ fontSize: "14px" }}
                                  >
                                    <a
                                      href={employeeData.resume.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      View Resume
                                    </a>
                                  </small>
                                )}
                              </div>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={handleDeleteResume}
                                title="Delete Resume"
                                style={{ fontSize: "14px" }}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="form-group mb-3">
                          <label style={labelStyle}>Cover Letter</label>
                          <div className="input-group">
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleCoverLetterChange}
                              disabled={uploading.coverLetter}
                              style={inputStyle}
                            />
                            {uploading.coverLetter && (
                              <span className="input-group-text">
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              </span>
                            )}
                          </div>
                          {employeeData.coverLetterFile?.name && (
                            <div className="mt-2 d-flex justify-content-between align-items-center">
                              <div>
                                <small
                                  className="text-muted d-block"
                                  style={{ fontSize: "14px" }}
                                >
                                  Current: {employeeData.coverLetterFile.name}
                                </small>
                                {employeeData.coverLetterFile?.url && (
                                  <small
                                    className="text-success"
                                    style={{ fontSize: "14px" }}
                                  >
                                    <a
                                      href={employeeData.coverLetterFile.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      View Cover Letter
                                    </a>
                                  </small>
                                )}
                              </div>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={handleDeleteCoverLetter}
                                title="Delete Cover Letter"
                                style={{ fontSize: "14px" }}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="form-group mb-3">
                          <label style={labelStyle}>
                            Profile Video (Max 10MB)
                          </label>

                          {isRecordingVideo && (
                            <div className="mb-3 p-3 border rounded bg-light">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span
                                  className="text-danger fw-bold"
                                  style={{ fontSize: "16px" }}
                                >
                                  Recording Video...{" "}
                                  {formatTimer(recordingTimer)}
                                </span>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={stopVideoRecording}
                                  style={{ fontSize: "14px" }}
                                >
                                  <FaStop className="me-1" /> Stop Recording
                                </button>
                              </div>
                              <video
                                ref={recordingVideoRef}
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                                muted
                              />
                            </div>
                          )}

                          <div className="d-flex gap-2 mb-2">
                            <div className="flex-grow-1">
                              <input
                                type="file"
                                className="form-control"
                                onChange={handleProfileVideoChange}
                                accept="video/*"
                                disabled={uploading.video || isRecordingVideo}
                                style={inputStyle}
                              />
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary d-flex align-items-center"
                              onClick={
                                isRecordingVideo
                                  ? stopVideoRecording
                                  : startVideoRecording
                              }
                              disabled={uploading.video}
                              style={{
                                fontSize: "14px",
                                padding: "12px 16px",
                                minWidth: "140px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <FaVideo className="me-2" />
                              {isRecordingVideo
                                ? "Stop Recording"
                                : "Record Video"}
                            </button>
                          </div>

                          {uploading.video && (
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              <span style={{ fontSize: "14px" }}>
                                Uploading...
                              </span>
                            </div>
                          )}

                          {uploadProgress.video > 0 &&
                            uploadProgress.video < 100 && (
                              <div className="progress mt-2">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: `${uploadProgress.video}%` }}
                                  aria-valuenow={uploadProgress.video}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  {uploadProgress.video}%
                                </div>
                              </div>
                            )}
                          {employeeData.profileVideo?.url && (
                            <div className="mt-2">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <small
                                  className="text-muted"
                                  style={{ fontSize: "14px" }}
                                >
                                  Current: {employeeData.profileVideo.name}
                                </small>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={handleDeleteVideo}
                                  title="Delete Video"
                                  style={{ fontSize: "14px" }}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                              <div
                                className="video-preview position-relative border rounded"
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  overflow: "hidden",
                                  backgroundColor: "#f8f9fa",
                                }}
                              >
                                <video
                                  ref={videoRef}
                                  src={employeeData.profileVideo.url}
                                  controls={false}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                  }}
                                  onEnded={() => setIsVideoPlaying(false)}
                                  onPause={() => setIsVideoPlaying(false)}
                                  onPlay={() => setIsVideoPlaying(true)}
                                />
                                <div
                                  className="position-absolute top-50 start-50 translate-middle"
                                  style={{ zIndex: 1000 }}
                                >
                                  <button
                                    className="btn rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                      width: "70px",
                                      height: "70px",
                                      fontSize: "28px",
                                      boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
                                      border: "4px solid white",
                                      color: "white",
                                      transition: "all 0.2s ease",
                                      display: "flex !important",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      toggleVideoPlayback();
                                    }}
                                    disabled={!employeeData.profileVideo?.url}
                                    title={isVideoPlaying ? "Pause" : "Play"}
                                  >
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        height: "100%",
                                      }}
                                    >
                                      {isVideoPlaying ? (
                                        <span style={{ fontSize: "28px" }}>
                                          ⏸
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            fontSize: "28px",
                                            marginLeft: "3px",
                                          }}
                                        >
                                          ▶
                                        </span>
                                      )}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label style={labelStyle}>
                            Introduction Audio (Max 10MB)
                          </label>

                          {isRecordingAudio && (
                            <div className="mb-3 p-3 border rounded bg-light">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <div className="me-3">
                                    <div
                                      className="bg-danger rounded-circle d-inline-block"
                                      style={{
                                        width: "12px",
                                        height: "12px",
                                        animation: "blink 1s infinite",
                                      }}
                                    ></div>
                                  </div>
                                  <span
                                    className="text-danger fw-bold"
                                    style={{ fontSize: "16px" }}
                                  >
                                    Recording Audio...{" "}
                                    {formatTimer(recordingTimer)}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={stopAudioRecording}
                                  style={{ fontSize: "14px" }}
                                >
                                  <FaStop className="me-1" /> Stop Recording
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="d-flex gap-2 mb-2">
                            <div className="flex-grow-1">
                              <input
                                type="file"
                                className="form-control"
                                onChange={handleIntroAudioChange}
                                accept="audio/*"
                                disabled={uploading.audio || isRecordingAudio}
                                style={inputStyle}
                              />
                            </div>
                            <button
                              type="button"
                              className="btn btn-success d-flex align-items-center"
                              onClick={
                                isRecordingAudio
                                  ? stopAudioRecording
                                  : startAudioRecording
                              }
                              disabled={uploading.audio}
                              style={{
                                fontSize: "14px",
                                padding: "12px 16px",
                                minWidth: "140px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <FaMicrophone className="me-2" />
                              {isRecordingAudio
                                ? "Stop Recording"
                                : "Record Audio"}
                            </button>
                          </div>

                          {uploading.audio && (
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              <span style={{ fontSize: "14px" }}>
                                Uploading...
                              </span>
                            </div>
                          )}

                          {uploadProgress.audio > 0 &&
                            uploadProgress.audio < 100 && (
                              <div className="progress mt-2">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: `${uploadProgress.audio}%` }}
                                  aria-valuenow={uploadProgress.audio}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  {uploadProgress.audio}%
                                </div>
                              </div>
                            )}
                          {employeeData.introductionAudio?.url && (
                            <div className="mt-2">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <small
                                  className="text-muted"
                                  style={{ fontSize: "14px" }}
                                >
                                  Current: {employeeData.introductionAudio.name}
                                </small>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={handleDeleteAudio}
                                  title="Delete Audio"
                                  style={{ fontSize: "14px" }}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                              <div
                                className="audio-preview d-flex align-items-center bg-light border rounded p-3"
                                style={{
                                  width: "100%",
                                  minHeight: "60px",
                                }}
                              >
                                <button
                                  className="btn bg-white rounded-circle border d-flex align-items-center justify-content-center me-3"
                                  style={{
                                    width: "48px",
                                    height: "48px",
                                    flexShrink: 0,
                                    fontSize: "18px",
                                    color: "#007bff",
                                    borderColor: "#dee2e6",
                                    transition: "all 0.2s ease",
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleAudioPlayback();
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#f8f9fa";
                                    e.target.style.borderColor = "#007bff";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "white";
                                    e.target.style.borderColor = "#dee2e6";
                                  }}
                                  disabled={
                                    !employeeData.introductionAudio?.url
                                  }
                                  title={
                                    isAudioPlaying
                                      ? "Pause Audio"
                                      : "Play Audio"
                                  }
                                >
                                  {isAudioPlaying ? (
                                    <span style={{ fontSize: "16px" }}>⏸</span>
                                  ) : (
                                    <span
                                      style={{
                                        fontSize: "16px",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      ▶
                                    </span>
                                  )}
                                </button>
                                <div className="flex-grow-1">
                                  <div
                                    className="text-muted small"
                                    style={{ fontSize: "14px" }}
                                  >
                                    Duration:{" "}
                                    {Math.floor(
                                      employeeData.introductionAudio.duration /
                                        60
                                    )}
                                    :
                                    {(
                                      employeeData.introductionAudio.duration %
                                      60
                                    )
                                      .toString()
                                      .padStart(2, "0")}
                                  </div>
                                  <div
                                    className="text-dark small fw-medium"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {isAudioPlaying
                                      ? "Playing..."
                                      : "Click play to listen"}
                                  </div>
                                </div>
                                <audio
                                  ref={audioRef}
                                  src={employeeData.introductionAudio.url}
                                  onEnded={() => setIsAudioPlaying(false)}
                                  onPause={() => setIsAudioPlaying(false)}
                                  onPlay={() => setIsAudioPlaying(true)}
                                  style={{ display: "none" }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-box border border-dark shadow">
                      <div className="jobplugin__profile-box__head">
                        <div className="jobplugin__profile-box__heading">
                          <h2 className="h5" style={{ fontSize: "18px" }}>
                            Personal Details
                          </h2>
                          <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                        </div>
                      </div>
                      <div className="jobplugin__profile-box__body">
                        <div className="form-group mb-3">
                          <label style={labelStyle}>Specialization</label>
                          <input
                            type="text"
                            className="form-control"
                            name="specialization"
                            value={employeeData.specialization || ""}
                            onChange={handleChange}
                            placeholder="Your area of expertise"
                            style={inputStyle}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label style={labelStyle}>Gender</label>
                          <div className="position-relative">
                            <select
                              className="form-control"
                              name="gender"
                              value={employeeData.gender || ""}
                              onChange={handleChange}
                              style={{ ...selectStyle, padding: "7px" }}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                            <FaChevronDown className="position-absolute end-0 top-50 translate-middle-y me-3" />
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label style={labelStyle}>Date of Birth</label>
                          <input
                            type="date"
                            className="form-control"
                            name="dob"
                            value={employeeData.dob || ""}
                            onChange={handleChange}
                            style={inputStyle}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label style={labelStyle}>Marital Status</label>
                          <div className="position-relative">
                            <select
                              className="form-control"
                              name="maritalStatus"
                              value={employeeData.maritalStatus || ""}
                              onChange={handleChange}
                              style={{ ...selectStyle, padding: "7px" }}
                            >
                              <option value="">Select Status</option>
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Divorced">Divorced</option>
                              <option value="Widowed">Widowed</option>
                            </select>
                            <FaChevronDown className="position-absolute end-0 top-50 translate-middle-y me-3" />
                          </div>
                        </div>

                        <div className="form-group mb-3">
                          <label style={labelStyle}>Total Experience</label>
                          <div className="row g-2">
                            <div className="col-6">
                              <select
                                className="form-control"
                                value={employeeData.totalExperienceYears || ""}
                                onChange={(e) =>
                                  handleTotalExperienceChange(
                                    "totalExperienceYears",
                                    e.target.value
                                  )
                                }
                                style={{ ...selectStyle, padding: "7px" }}
                              >
                                <option value="">Years</option>
                                <option value="0">0 Years</option>
                                {Array.from(
                                  { length: 30 },
                                  (_, i) => i + 1
                                ).map((year) => (
                                  <option key={year} value={year}>
                                    {year} Year{year !== 1 ? "s" : ""}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-6">
                              <select
                                className="form-control"
                                value={employeeData.totalExperienceMonths || ""}
                                onChange={(e) =>
                                  handleTotalExperienceChange(
                                    "totalExperienceMonths",
                                    e.target.value
                                  )
                                }
                                style={{ ...selectStyle, padding: "7px" }}
                              >
                                <option value="">Months</option>
                                <option value="0">0 Months</option>
                                {Array.from(
                                  { length: 11 },
                                  (_, i) => i + 1
                                ).map((month) => (
                                  <option key={month} value={month}>
                                    {month} Month{month !== 1 ? "s" : ""}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          {employeeData.totalExperience && (
                            <small
                              className="text-muted mt-1 d-block"
                              style={{ fontSize: "14px" }}
                            >
                              Current: {employeeData.totalExperience}
                            </small>
                          )}
                        </div>

                        <div className="form-group">
                          <label style={labelStyle}>
                            Expected Annual Salary (₹)
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="expectedSalary"
                            value={employeeData.expectedSalary || ""}
                            onChange={handleChange}
                            placeholder="Expected salary in INR"
                            style={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                  </aside>

                  <div className="jobplugin__profile-content border border-dark shadow">
                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4" style={{ fontSize: "20px" }}>
                          Profile Summary
                        </h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            name="profilesummary"
                            rows="5"
                            value={
                              employeeData.profilesummary ||
                              employeeData.coverLetter ||
                              ""
                            }
                            onChange={handleChange}
                            placeholder="Write a brief summary about yourself and your career objectives"
                            style={textareaStyle}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4" style={{ fontSize: "20px" }}>
                          Skills
                        </h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="form-group mb-3">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              placeholder="Add a new skill"
                              style={inputStyle}
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), handleAddSkill())
                              }
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddSkill}
                              style={{ height: "45px", fontSize: "16px" }}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {employeeData.skills?.map((skill, index) => (
                            <span
                              key={index}
                              className="badge bg-secondary d-flex align-items-center gap-2"
                              style={{ fontSize: "14px", padding: "10px 14px" }}
                            >
                              {skill}
                              <button
                                type="button"
                                className="btn btn-sm p-0 text-white border-0 bg-transparent"
                                onClick={() => handleRemoveSkill(skill)}
                                style={{ lineHeight: 1 }}
                              >
                                <FaTimes size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4" style={{ fontSize: "20px" }}>
                          Languages
                        </h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="form-group mb-3">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={newLanguage}
                              onChange={(e) => setNewLanguage(e.target.value)}
                              placeholder="Add a new language"
                              style={inputStyle}
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), handleAddLanguage())
                              }
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddLanguage}
                              style={{ height: "45px", fontSize: "16px" }}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {employeeData.languages?.map((language, index) => (
                            <span
                              key={index}
                              className="badge bg-secondary d-flex align-items-center gap-2"
                              style={{ fontSize: "14px", padding: "10px 14px" }}
                            >
                              {language}
                              <button
                                type="button"
                                className="btn btn-sm p-0 text-white border-0 bg-transparent"
                                onClick={() => handleRemoveLanguage(language)}
                                style={{ lineHeight: 1 }}
                              >
                                <FaTimes size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4" style={{ fontSize: "20px" }}>
                          Grade Levels
                        </h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="form-group mb-3">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={newGradeLevel}
                              onChange={(e) => setNewGradeLevel(e.target.value)}
                              placeholder="Add a grade level (e.g., Class 1, Class 2)"
                              style={inputStyle}
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), handleAddGradeLevel())
                              }
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddGradeLevel}
                              style={{ height: "45px", fontSize: "16px" }}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {employeeData.gradeLevels?.map((grade, index) => (
                            <span
                              key={index}
                              className="badge bg-secondary d-flex align-items-center gap-2"
                              style={{ fontSize: "14px", padding: "10px 14px" }}
                            >
                              {grade}
                              <button
                                type="button"
                                className="btn btn-sm p-0 text-white border-0 bg-transparent"
                                onClick={() => handleRemoveGradeLevel(grade)}
                                style={{ lineHeight: 1 }}
                              >
                                <FaTimes size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4" style={{ fontSize: "20px" }}>
                          Address
                        </h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label style={labelStyle}>Address Line 1</label>
                              <input
                                type="text"
                                className="form-control"
                                name="addressLine1"
                                value={employeeData.addressLine1 || ""}
                                onChange={handleChange}
                                placeholder="Street address, P.O. box"
                                style={inputStyle}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label style={labelStyle}>Address Line 2</label>
                              <input
                                type="text"
                                className="form-control"
                                name="addressLine2"
                                value={employeeData.addressLine2 || ""}
                                onChange={handleChange}
                                placeholder="Apartment, suite, unit"
                                style={inputStyle}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label style={labelStyle}>City</label>
                              <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={employeeData.city || ""}
                                onChange={handleChange}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label style={labelStyle}>State</label>
                              <input
                                type="text"
                                className="form-control"
                                name="state"
                                value={employeeData.state || ""}
                                onChange={handleChange}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label style={labelStyle}>PIN Code</label>
                              <input
                                type="text"
                                className="form-control"
                                name="pincode"
                                value={employeeData.pincode || ""}
                                onChange={handleChange}
                                pattern="[0-9]{6}"
                                title="6-digit PIN code"
                                style={inputStyle}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label style={labelStyle}>
                                Preferred Location
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="preferredLocation"
                                value={employeeData.preferredLocation || ""}
                                onChange={handleChange}
                                placeholder="Preferred work location"
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4" style={{ fontSize: "20px" }}>
                          Education
                        </h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div
                          className="card mb-4"
                          style={{
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #e9ecef",
                          }}
                        >
                          <div className="card-header bg-white">
                            <h6
                              className="mb-0 fw-semibold"
                              style={{ fontSize: "16px" }}
                            >
                              Add New Education
                            </h6>
                          </div>
                          <div className="card-body">
                            <div className="row g-3">
                              <div className="col-md-6">
                                <label
                                  className="form-label"
                                  style={labelStyle}
                                >
                                  Degree/Certificate*
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={newEducation.degree}
                                  onChange={(e) =>
                                    setNewEducation({
                                      ...newEducation,
                                      degree: e.target.value,
                                    })
                                  }
                                  placeholder="e.g., Bachelor of Science, MBA"
                                  style={inputStyle}
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  className="form-label"
                                  style={labelStyle}
                                >
                                  Institution*
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={newEducation.institution}
                                  onChange={(e) =>
                                    setNewEducation({
                                      ...newEducation,
                                      institution: e.target.value,
                                    })
                                  }
                                  placeholder="e.g., Harvard University, IIT Delhi"
                                  style={inputStyle}
                                />
                              </div>
                              <div className="col-md-4">
                                <label
                                  className="form-label"
                                  style={labelStyle}
                                >
                                  Type
                                </label>
                                <div style={{ position: "relative" }}>
                                  <select
                                    className="form-control"
                                    value={newEducation.type}
                                    onChange={(e) =>
                                      setNewEducation({
                                        ...newEducation,
                                        type: e.target.value,
                                      })
                                    }
                                    style={{
                                      ...selectStyle,
                                      padding: "7px",
                                      WebkitAppearance: "none",
                                      MozAppearance: "none",
                                      appearance: "none",
                                      backgroundImage: "none",
                                      backgroundRepeat: "no-repeat",
                                    }}
                                  >
                                    <option value="">Select Type</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Distance">Distance</option>
                                    <option value="Online">Online</option>
                                  </select>
                                  <FaChevronDown
                                    style={{
                                      position: "absolute",
                                      right: "15px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      pointerEvents: "none",
                                      color: "#6c757d",
                                      fontSize: "12px",
                                      zIndex: 1,
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <label
                                  className="form-label"
                                  style={labelStyle}
                                >
                                  Grade/CGPA
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={newEducation.grade}
                                  onChange={(e) =>
                                    setNewEducation({
                                      ...newEducation,
                                      grade: e.target.value,
                                    })
                                  }
                                  placeholder="e.g., 8.5 CGPA, 85%"
                                  style={inputStyle}
                                />
                              </div>
                              <div className="col-md-4">
                                <label
                                  className="form-label"
                                  style={labelStyle}
                                >
                                  Field of Study
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={newEducation.fieldOfStudy || ""}
                                  onChange={(e) =>
                                    setNewEducation({
                                      ...newEducation,
                                      fieldOfStudy: e.target.value,
                                    })
                                  }
                                  placeholder="e.g., Computer Science, Business"
                                  style={inputStyle}
                                />
                              </div>

                              <div className="col-md-6">
                                <label
                                  className="form-label"
                                  style={labelStyle}
                                >
                                  Start Date
                                </label>
                                <div className="row g-2">
                                  <div className="col-6">
                                    <select
                                      className="form-control"
                                      value={newEducation.startYear}
                                      onChange={(e) =>
                                        setNewEducation({
                                          ...newEducation,
                                          startYear: e.target.value,
                                        })
                                      }
                                      style={{
                                        ...selectStyle,
                                        appearance: "none",
                                        backgroundImage: "none",
                                        padding: "7px",
                                      }}
                                    >
                                      <option value="">Year</option>
                                      {years.map((year) => (
                                        <option key={year} value={year}>
                                          {year}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-6">
                                    <select
                                      className="form-control"
                                      value={newEducation.startMonth}
                                      onChange={(e) =>
                                        setNewEducation({
                                          ...newEducation,
                                          startMonth: e.target.value,
                                        })
                                      }
                                      style={{
                                        ...selectStyle,
                                        appearance: "none",
                                        backgroundImage: "none",
                                        padding: "7px",
                                      }}
                                    >
                                      <option value="">Month</option>
                                      {months.map((month) => (
                                        <option
                                          key={month.value}
                                          value={month.value}
                                        >
                                          {month.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <label
                                  className="form-label"
                                  style={labelStyle}
                                >
                                  End Date
                                </label>
                                <div className="row g-2">
                                  <div className="col-6">
                                    <select
                                      className="form-control"
                                      value={newEducation.endYear}
                                      onChange={(e) =>
                                        setNewEducation({
                                          ...newEducation,
                                          endYear: e.target.value,
                                        })
                                      }
                                      style={{
                                        ...selectStyle,
                                        appearance: "none",
                                        backgroundImage: "none",
                                        padding: "7px",
                                      }}
                                    >
                                      <option value="">Year</option>
                                      <option value="">Present</option>
                                      {years.map((year) => (
                                        <option key={year} value={year}>
                                          {year}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-6">
                                    <select
                                      className="form-control"
                                      value={newEducation.endMonth}
                                      onChange={(e) =>
                                        setNewEducation({
                                          ...newEducation,
                                          endMonth: e.target.value,
                                        })
                                      }
                                      style={{
                                        ...selectStyle,
                                        appearance: "none",
                                        backgroundImage: "none",
                                        padding: "7px",
                                      }}
                                    >
                                      <option value="">Month</option>
                                      {months.map((month) => (
                                        <option
                                          key={month.value}
                                          value={month.value}
                                        >
                                          {month.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div className="col-12">
                                <label
                                  className="form-label"
                                  style={labelStyle}
                                >
                                  Description (Optional)
                                </label>
                                <textarea
                                  className="form-control"
                                  rows="3"
                                  value={newEducation.description}
                                  onChange={(e) =>
                                    setNewEducation({
                                      ...newEducation,
                                      description: e.target.value,
                                    })
                                  }
                                  placeholder="Additional details about your education, achievements, etc."
                                  style={textareaStyle}
                                />
                              </div>

                              <div className="col-12">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm mt-2"
                                  onClick={handleAddEducation}
                                  disabled={
                                    !newEducation.degree ||
                                    !newEducation.institution
                                  }
                                  style={{
                                    fontSize: "16px",
                                    padding: "10px 16px",
                                  }}
                                >
                                  <FaPlus
                                    className="me-2"
                                    style={{ fontSize: "15px" }}
                                  />
                                  Add Education
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {employeeData.education?.map((edu, index) => (
                          <div
                            key={index}
                            className="card mb-3"
                            style={{ border: "1px solid #e9ecef" }}
                          >
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start">
                                <div className="flex-grow-1">
                                  <h5
                                    className="card-title mb-1"
                                    style={{ fontSize: "18px" }}
                                  >
                                    {edu.degree}
                                  </h5>
                                  <h6
                                    className="card-subtitle mb-2 text-muted"
                                    style={{ fontSize: "16px" }}
                                  >
                                    {edu.institution}
                                  </h6>
                                  <div className="mb-2">
                                    <span
                                      className="badge bg-secondary me-2"
                                      style={{ fontSize: "13px" }}
                                    >
                                      {edu.type}
                                    </span>
                                    <small
                                      className="text-muted"
                                      style={{ fontSize: "14px" }}
                                    >
                                      {edu.startDate} -{" "}
                                      {edu.endDate || "Present"}
                                    </small>
                                  </div>
                                  {edu.grade && (
                                    <p
                                      className="mb-1"
                                      style={{ fontSize: "15px" }}
                                    >
                                      <small className="text-muted">
                                        Grade:{" "}
                                      </small>
                                      <span className="fw-medium">
                                        {edu.grade}
                                      </span>
                                    </p>
                                  )}
                                  {edu.fieldOfStudy && (
                                    <p
                                      className="mb-1"
                                      style={{ fontSize: "15px" }}
                                    >
                                      <small className="text-muted">
                                        Field:{" "}
                                      </small>
                                      <span>{edu.fieldOfStudy}</span>
                                    </p>
                                  )}
                                  {edu.description && (
                                    <p
                                      className="mb-0 mt-2"
                                      style={{ fontSize: "15px" }}
                                    >
                                      {edu.description}
                                    </p>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger ms-3"
                                  onClick={() => handleRemoveEducation(index)}
                                  title="Delete Education"
                                  style={{ fontSize: "14px" }}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="jobplugin__profile-block">
                      <div className="jobplugin__profile-block__header">
                        <h2 className="h4">Work Experience</h2>
                      </div>
                      <div className="jobplugin__profile-block__body">
                        <div
                          className="card mb-4"
                          style={{
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #e9ecef",
                          }}
                        >
                          <div className="card-header bg-white">
                            <h6 className="mb-0 fw-semibold">
                              Add New Experience
                            </h6>
                          </div>
                          <div className="card-body">
                            <div className="row g-3">
                              <div className="col-md-6">
                                <label className="form-label">
                                  Position/Job Title*
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={newExperience.position}
                                  onChange={(e) =>
                                    setNewExperience({
                                      ...newExperience,
                                      position: e.target.value,
                                    })
                                  }
                                  placeholder="e.g., Software Engineer, Marketing Manager"
                                  style={inputStyle}
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">Company*</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={newExperience.company}
                                  onChange={(e) =>
                                    setNewExperience({
                                      ...newExperience,
                                      company: e.target.value,
                                    })
                                  }
                                  placeholder="e.g., Google, Microsoft, ABC Corp"
                                  style={inputStyle}
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Employment Type
                                </label>
                                <div className="position-relative">
                                  <select
                                    className="form-control"
                                    value={newExperience.employmentType}
                                    onChange={(e) =>
                                      setNewExperience({
                                        ...newExperience,
                                        employmentType: e.target.value,
                                      })
                                    }
                                    style={{ ...selectStyle, padding: "7px" }}
                                  >
                                    <option value="">Select Type</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">
                                      Internship
                                    </option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Temporary">Temporary</option>
                                  </select>
                                  <FaChevronDown className="position-absolute end-0 top-50 translate-middle-y me-3" />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">Location</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={newExperience.location || ""}
                                  onChange={(e) =>
                                    setNewExperience({
                                      ...newExperience,
                                      location: e.target.value,
                                    })
                                  }
                                  placeholder="e.g., New York, NY | Remote"
                                  style={inputStyle}
                                />
                              </div>

                              <div className="col-md-6">
                                <label className="form-label">Start Date</label>
                                <div className="row g-2">
                                  <div className="col-6">
                                    <select
                                      className="form-control"
                                      value={newExperience.startYear}
                                      onChange={(e) =>
                                        setNewExperience({
                                          ...newExperience,
                                          startYear: e.target.value,
                                        })
                                      }
                                      style={{ ...selectStyle, padding: "7px" }}
                                    >
                                      <option value="">Year</option>
                                      {years.map((year) => (
                                        <option key={year} value={year}>
                                          {year}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-6">
                                    <select
                                      className="form-control"
                                      value={newExperience.startMonth}
                                      onChange={(e) =>
                                        setNewExperience({
                                          ...newExperience,
                                          startMonth: e.target.value,
                                        })
                                      }
                                      style={{ ...selectStyle, padding: "7px" }}
                                    >
                                      <option value="">Month</option>
                                      {months.map((month) => (
                                        <option
                                          key={month.value}
                                          value={month.value}
                                        >
                                          {month.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <label className="form-label">End Date</label>
                                <div className="row g-2">
                                  <div className="col-6">
                                    <select
                                      className="form-control"
                                      value={newExperience.endYear}
                                      onChange={(e) =>
                                        setNewExperience({
                                          ...newExperience,
                                          endYear: e.target.value,
                                        })
                                      }
                                      style={{ ...selectStyle, padding: "7px" }}
                                    >
                                      <option value="">Year</option>
                                      <option value="">Present</option>
                                      {years.map((year) => (
                                        <option key={year} value={year}>
                                          {year}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-6">
                                    <select
                                      className="form-control"
                                      value={newExperience.endMonth}
                                      onChange={(e) =>
                                        setNewExperience({
                                          ...newExperience,
                                          endMonth: e.target.value,
                                        })
                                      }
                                      style={{ ...selectStyle, padding: "7px" }}
                                    >
                                      <option value="">Month</option>
                                      {months.map((month) => (
                                        <option
                                          key={month.value}
                                          value={month.value}
                                        >
                                          {month.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div className="col-12">
                                <label className="form-label">
                                  Job Description
                                </label>
                                <textarea
                                  className="form-control"
                                  rows="4"
                                  value={newExperience.description}
                                  onChange={(e) =>
                                    setNewExperience({
                                      ...newExperience,
                                      description: e.target.value,
                                    })
                                  }
                                  placeholder="Describe your responsibilities, achievements, and key accomplishments in this role..."
                                  style={textareaStyle}
                                />
                              </div>

                              <div className="col-12">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                  onClick={handleAddExperience}
                                  disabled={
                                    !newExperience.position ||
                                    !newExperience.company
                                  }
                                  style={{
                                    fontSize: "14px",
                                    padding: "6px 12px",
                                  }}
                                >
                                  <FaPlus
                                    className="me-2"
                                    style={{ fontSize: "12px" }}
                                  />
                                  Add Experience
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {employeeData.workExperience?.map((exp, index) => (
                          <div
                            key={index}
                            className="card mb-3"
                            style={{ border: "1px solid #e9ecef" }}
                          >
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start">
                                <div className="flex-grow-1">
                                  <h5 className="card-title mb-1">
                                    {exp.position}
                                  </h5>
                                  <h6 className="card-subtitle mb-2 text-muted">
                                    {exp.company}
                                  </h6>
                                  <div className="mb-2">
                                    <span className="badge bg-secondary me-2">
                                      {exp.employmentType}
                                    </span>
                                    <small className="text-muted">
                                      {exp.startDate} -{" "}
                                      {exp.endDate || "Present"}
                                    </small>
                                  </div>
                                  {exp.location && (
                                    <p className="mb-1">
                                      <small className="text-muted">
                                        Location:{" "}
                                      </small>
                                      <span>{exp.location}</span>
                                    </p>
                                  )}
                                  {exp.description && (
                                    <p className="mb-0 mt-2">
                                      {exp.description}
                                    </p>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger ms-3"
                                  onClick={() => handleRemoveExperience(index)}
                                  title="Delete Experience"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* ✅ PROFILE IMAGE CIRCLE FIX - CSS ADDED BELOW */}
      <style jsx>{`
        .jobplugin__profile-intro__image {
          position: relative;
          width: 155px;
          height: 155px;
          margin-bottom: 15px;
        }

        .jobplugin__profile-intro__avatar {
          width: 150px;
          height: 150px;
          overflow: hidden;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .jobplugin__profile-intro__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .jobplugin__settings-card__edit {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          background-color: white;
          color: #2c5aa0;
          transition: all 0.3s ease;
        }

        .jobplugin__settings-card__edit:hover {
          background-color: #2c5aa0;
          color: white;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </>
  );
};

export default EmployeeerEditProfile;