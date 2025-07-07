import React, { useState, useRef } from "react";
import "./UploadDocuments.css";

const UploadDocuments = () => {
  const [files, setFiles] = useState([
    { id: "cv", label: "Curriculum Vitae (CV)", fileObject: null, status: "pending", progress: 0, errorMessage: null, required: true },
    { id: "certificates", label: "Academic Certificates", fileObject: null, status: "pending", progress: 0, errorMessage: null, required: true },
    { id: "evidence", label: "Evidence Documents", fileObject: null, status: "pending", progress: 0, errorMessage: null, required: true }
  ]);
  const [nextAdditionalId, setNextAdditionalId] = useState(0);
  const fileInputRefs = useRef({});

  const navigate = (path) => {
    console.log(`Simulating navigation to: ${path}`);
  };

  const simulateUpload = (docId, file) => {
    setFiles((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: "uploading", progress: 0, fileObject: file, errorMessage: null } : d))
    );

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress <= 100) {
        setFiles((prev) =>
          prev.map((d) => (d.id === docId ? { ...d, progress: currentProgress } : d))
        );
      } else {
        clearInterval(interval);
        const isSuccess = Math.random() > 0.1;
        setFiles((prev) =>
          prev.map((d) =>
            d.id === docId
              ? {
                  ...d,
                  status: isSuccess ? "completed" : "failed",
                  progress: 100,
                  errorMessage: isSuccess ? null : "Upload failed. Please try again."
                }
              : d
          )
        );
      }
    }, 200);
  };

  const handleFileChange = (e, docId) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        console.error("Only PDF files are allowed.");
        setFiles((prev) =>
          prev.map((d) =>
            d.id === docId ? { ...d, status: "failed", errorMessage: "Only PDF files are allowed." } : d
          )
        );
        return;
      }
      if (selectedFile.size > 90 * 1024 * 1024) {
        console.error("File size exceeds 90MB.");
        setFiles((prev) =>
          prev.map((d) =>
            d.id === docId ? { ...d, status: "failed", errorMessage: "File size exceeds 90MB." } : d
          )
        );
        return;
      }
      simulateUpload(docId, selectedFile);
    }
  };

  const handleAddDocument = () => {
    const newId = `additional_${nextAdditionalId}`;
    setFiles((prev) => [
      ...prev,
      { id: newId, label: `Nyaraka Nyingine ${nextAdditionalId + 1}`, fileObject: null, status: "pending", progress: 0, errorMessage: null, required: false }
    ]);
    setNextAdditionalId((prev) => prev + 1);
  };

  const handleRemoveDocument = (docId) => {
    setFiles((prev) => prev.filter((d) => d.id !== docId));
  };

  const handleSubmit = () => {
    const allRequiredCompleted = files.every((d) => !d.required || d.status === "completed");
    if (!allRequiredCompleted) {
      console.error("Please complete all required uploads.");
      return;
    }
    const hasFailed = files.some((d) => d.status === "failed");
    if (hasFailed) {
      console.error("Please resolve failed uploads.");
      return;
    }
    console.log("Uploads complete!");
    navigate("/applicant/status");
  };

  const anyUploading = files.some((d) => d.status === "uploading");

  return (
    <div className="upload-container">
      <div className="upload-card">
        <div className="upload-header">
          {anyUploading ? (
            <svg className="upload-icon uploading" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
          ) : (
            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"/>
            </svg>
          )}
          <h2>{anyUploading ? "Nyaraka Zinapakuliwa..." : "Pakia Nyaraka."}</h2>
          <p>Inaauniwa: PDF. Ukubwa wa juu: 90MB</p>
        </div>

        <div className="top-button-wrapper">
          <button className="add-btn" onClick={handleAddDocument}>+ Ongeza Waraka Mwingine</button>
        </div>

        <div className="file-list">
          {files.map((doc) => (
            <div key={doc.id} className="file-item">
              <svg className="pdf-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
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
                {doc.status === "completed" && <span className="status-complete">Imekamilika</span>}
                {doc.status === "failed" && <span className="status-failed">Imeshindwa: {doc.errorMessage}</span>}
              </div>
              {doc.status === "pending" || doc.status === "failed" ? (
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
                    Pakia
                  </button>
                </>
              ) : (
                <button className="remove-btn" onClick={() => handleRemoveDocument(doc.id)}>X</button>
              )}
            </div>
          ))}
        </div>

        <div className="bottom-button-wrapper">
          <button className="submit-btn" onClick={handleSubmit}>Wasilisha Nyaraka Zote</button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
