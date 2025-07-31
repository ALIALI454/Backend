import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadDocuments.css";

const UploadDocuments = () => {
  const [files, setFiles] = useState([
    { id: "cv", label: "Curriculum Vitae (CV)", fileObject: null, status: "pending", progress: 0, errorMessage: null, required: true },
    { id: "certificates", label: "Academic Certificates", fileObject: null, status: "pending", progress: 0, errorMessage: null, required: true },
    { id: "evidence", label: "Evidence Documents", fileObject: null, status: "pending", progress: 0, errorMessage: null, required: true }
  ]);
  const [nextAdditionalId, setNextAdditionalId] = useState(0);
  const fileInputRefs = useRef({});
  const navigate = useNavigate();

  // Function to upload file to backend
 const uploadToBackend = async (docId, file) => {
  setFiles((prev) =>
    prev.map((d) =>
      d.id === docId ? { ...d, status: "uploading", progress: 0, fileObject: file, errorMessage: null } : d
    )
  );

  const formData = new FormData();

  let documentType = "";
  if (docId === "cv") documentType = "Curriculum Vitae (CV)";
  else if (docId === "certificates") documentType = "Academic Certificates";
  else if (docId === "evidence") documentType = "Evidence Documents";
  else documentType = "Additional Documents";

  formData.append("documentType", documentType);
  formData.append("file", file);

  const applicationId = localStorage.getItem("applicationId");
  if (!applicationId) {
    alert("Application ID not found. Please fill the application form first.");
    return;
  }
  try {
    for (let p = 0; p <= 90; p += 10) {
      await new Promise((res) => setTimeout(res, 100));
      setFiles((prev) => prev.map((d) => (d.id === docId ? { ...d, progress: p } : d)));
    }

    const response = await fetch(`http://localhost:8080/api/documents/${applicationId}/documents`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(`Upload failed with status ${response.status}`);

    await response.json();

    setFiles((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: "completed", progress: 100, errorMessage: null } : d))
    );
  } catch (error) {
    setFiles((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: "failed", errorMessage: error.message } : d))
    );
  }
};

  const handleFileChange = (e, docId) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate PDF only
    if (selectedFile.type !== "application/pdf") {
      setFiles((prev) =>
        prev.map((d) =>
          d.id === docId ? { ...d, status: "failed", errorMessage: "Only PDF files are allowed." } : d
        )
      );
      return;
    }

    // Validate max size 90MB
    if (selectedFile.size > 90 * 1024 * 1024) {
      setFiles((prev) =>
        prev.map((d) =>
          d.id === docId ? { ...d, status: "failed", errorMessage: "File size exceeds 90MB." } : d
        )
      );
      return;
    }

    uploadToBackend(docId, selectedFile);
  };

  const handleAddDocument = () => {
    const newId = `additional_${nextAdditionalId}`;
    setFiles((prev) => [
      ...prev,
      {
        id: newId,
        label: `Additional Document ${nextAdditionalId + 1}`,
        fileObject: null,
        status: "pending",
        progress: 0,
        errorMessage: null,
        required: false,
      },
    ]);
    setNextAdditionalId((prev) => prev + 1);
  };

  const handleRemoveDocument = (docId) => {
    setFiles((prev) => prev.filter((d) => d.id !== docId));
  };

  const handleSubmit = () => {
    const allRequiredCompleted = files.every((d) => !d.required || d.status === "completed");
    if (!allRequiredCompleted) {
      alert("Please upload all required documents.");
      return;
    }
    const hasFailed = files.some((d) => d.status === "failed");
    if (hasFailed) {
      alert("Please fix failed document uploads before submitting.");
      return;
    }
    alert("Documents submitted successfully!");
    navigate("/applicant/status");
  };

  const anyUploading = files.some((d) => d.status === "uploading");

  return (
    <div className="upload-container">
      <div className="upload-card">
        <div className="upload-header">
          {anyUploading ? (
            <svg className="upload-icon uploading" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          ) : (
            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" />
            </svg>
          )}
          <h2>{anyUploading ? "Uploading Documents..." : "Upload Documents"}</h2>
          <p>Supported: PDF only. Max size: 90MB</p>
        </div>

        <div className="top-button-wrapper">
          <button className="add-btn" onClick={handleAddDocument}>
            + Add Another Document
          </button>
        </div>

        <div className="file-list">
          {files.map((doc) => (
            <div key={doc.id} className="file-item">
              <svg className="pdf-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
              </svg>
              <div className="file-info">
                <p title={doc.fileObject?.name || doc.label}>
                  {doc.fileObject ? doc.fileObject.name : doc.label}
                </p>
                {doc.status === "uploading" && (
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${doc.progress}%` }}></div>
                  </div>
                )}
                {doc.status === "completed" && <span className="status-complete">Completed</span>}
                {doc.status === "failed" && (
                  <span className="status-failed">Failed: {doc.errorMessage}</span>
                )}
              </div>
              {(doc.status === "pending" || doc.status === "failed") ? (
                <>
                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[doc.id] = el)}
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, doc.id)}
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className="upload-btn"
                    onClick={() => fileInputRefs.current[doc.id]?.click()}
                  >
                    Upload
                  </button>
                </>
              ) : (
                <button className="remove-btn" onClick={() => handleRemoveDocument(doc.id)}>
                  X
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bottom-button-wrapper">
          <button className="submit-btn" onClick={handleSubmit}>
            Submit All Documents
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
