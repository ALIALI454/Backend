import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import "./DocumentViewer.css";

// This is the correct way to set the worker source.
// pdfjsLib.version will automatically pull the version from your installed pdfjs-dist package.
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const DocumentViewer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const application = state?.application || {};
  const canvasRef = useRef(null);
  const containerRef = useRef(null); // Ref for the canvas container

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [activeDoc, setActiveDoc] = useState("cv");
  const [pdf, setPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample documents - in a real app, these would come from a backend or direct file uploads
  const documents = useMemo(() => ({
    cv: "/sample-cv.pdf",
    certificates: "/sample-certificates.pdf",
    publications: "/sample-publications.pdf",
    teaching_portfolio: "/sample-teaching.pdf",
  }), []);

  const documentTypes = useMemo(() => [
    { id: "cv", name: "Curriculum Vitae" },
    { id: "certificates", name: "Certificates" },
    { id: "publications", name: "Publications" },
    { id: "teaching_portfolio", name: "Teaching Portfolio" },
  ], []);

  const renderPage = useCallback(async (pdfDoc, pageNum, currentScale, currentRotation) => {
    if (!pdfDoc || !canvasRef.current) return;

    try {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: currentScale, rotation: currentRotation });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match viewport and handle high-DPI screens
      const outputScale = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height = Math.floor(viewport.height) + "px";

      const transform = outputScale !== 1
        ? [outputScale, 0, 0, outputScale, 0, 0]
        : null;

      await page.render({
        canvasContext: context,
        viewport,
        transform,
      }).promise;

      if (containerRef.current) {
        // Adjust container scroll to center the canvas if it's larger than the container
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        containerRef.current.scrollLeft = (canvasWidth / outputScale - containerWidth) / 2;
        containerRef.current.scrollTop = (canvasHeight / outputScale - containerHeight) / 2;
      }

    } catch (err) {
      console.error("Error rendering page:", err);
      setError("Failed to render page.");
    }
  }, []);

  const loadDocument = useCallback(async (url) => {
    if (!url) {
      setPdf(null);
      setNumPages(null);
      setPageNumber(1);
      setError("No document URL provided.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const loadingTask = pdfjsLib.getDocument(url);
      const pdfDocument = await loadingTask.promise;
      setPdf(pdfDocument);
      setNumPages(pdfDocument.numPages);
      setPageNumber(1); // Reset to first page on new document load
      setScale(1.0); // Reset scale
      setRotation(0); // Reset rotation

      await renderPage(pdfDocument, 1, 1.0, 0); // Render first page with default scale and rotation
    } catch (err) {
      console.error("PDF loading error:", err);
      setError("Failed to load document. Please try again.");
      setPdf(null); // Clear previous PDF
      setNumPages(null);
    } finally {
      setIsLoading(false);
    }
  }, [renderPage]);

  // Effect to load document when activeDoc or application documents change
  useEffect(() => {
    if (application.documents?.[activeDoc]) {
      // Use the sample document URL if the application actually has that document marked as 'true'
      loadDocument(documents[activeDoc]);
    } else {
      // If document is not available for this application, clear the viewer
      setPdf(null);
      setNumPages(null);
      setPageNumber(1);
      setError(null); // Clear any previous errors
      setIsLoading(false);
    }
  }, [activeDoc, application.documents, documents, loadDocument]);

  // Effect to re-render page when scale, rotation, or pageNumber changes (for the current PDF)
  useEffect(() => {
    if (pdf) {
      renderPage(pdf, pageNumber, scale, rotation);
    }
  }, [pageNumber, scale, rotation, pdf, renderPage]);


  const changePage = (offset) => {
    const newPage = Math.max(1, Math.min(pageNumber + offset, numPages));
    if (newPage !== pageNumber) {
      setPageNumber(newPage);
    }
  };

  const zoomIn = () => {
    const newScale = Math.min(scale + 0.25, 3.0);
    setScale(newScale);
  };

  const zoomOut = () => {
    const newScale = Math.max(scale - 0.25, 0.5);
    setScale(newScale);
  };

  const rotate = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
  };

  const currentDocumentAvailable = application.documents?.[activeDoc];

  return (
    <div className="viewer-container">
      <div className="viewer-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ⬅️ Back to Applications
        </button>
        <div className="viewer-title">
          <h2>Document Viewer</h2>
          <p>Reviewing documents for **{application.name || "N/A"}**</p>
        </div>
      </div>

      <div className="document-tabs">
        {documentTypes.map((doc) => (
          <button
            key={doc.id}
            className={`tab-button ${
              activeDoc === doc.id ? "active" : ""
            }`}
            onClick={() => setActiveDoc(doc.id)}
            aria-pressed={activeDoc === doc.id}
          >
            {application.documents?.[doc.id] ? "✅" : "❌"}{" "}
            {doc.name}
          </button>
        ))}
      </div>

      <div className="viewer-content">
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Loading document...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <p>Please select another document or try again later.</p>
          </div>
        ) : !currentDocumentAvailable ? (
          <div className="no-document-selected">
            <span className="icon">📄</span>
            <h3>Document Not Available</h3>
            <p>This document has not been submitted for this application.</p>
            <p>Please select a different document from the tabs above.</p>
          </div>
        ) : (
          <div className="canvas-container" ref={containerRef}>
            <canvas ref={canvasRef} className="pdf-canvas" />
          </div>
        )}
      </div>

      <div className="viewer-toolbar">
        <button
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1 || !pdf}
          aria-label="Previous Page"
        >
          ⬅️ Previous
        </button>
        <span className="page-info">
          Page {pageNumber} of {numPages || "--"}
        </span>
        <button
          onClick={() => changePage(1)}
          disabled={pageNumber >= (numPages || 0) || !pdf}
          aria-label="Next Page"
        >
          Next ➡️
        </button>
        <button onClick={zoomOut} disabled={!pdf} aria-label="Zoom Out">
          ➖ Zoom Out
        </button>
        <button onClick={zoomIn} disabled={!pdf} aria-label="Zoom In">
          ➕ Zoom In
        </button>
        <button onClick={rotate} disabled={!pdf} aria-label="Rotate Document">
          🔄 Rotate
        </button>
        {currentDocumentAvailable && (
          <a href={documents[activeDoc]} download className="download-link" aria-label="Download Document">
            ⬇️ Download
          </a>
        )}
      </div>

      <div className="proceed-button-wrapper">
        <button
          className="proceed-button"
          onClick={() =>
            navigate("/reviewer/feedback", { state: { application } })
          }
        >
          Proceed to Feedback ➡️
        </button>
      </div>
    </div>
  );
};

export default DocumentViewer;