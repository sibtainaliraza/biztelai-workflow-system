import { useState } from "react";

import { uploadDocument } from "../services/uploadService";
import ReviewTable from "../components/review/ReviewTable";

import "../styles/uploadPage.css";

const UploadPage = () => {
  // Component state
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Upload document and process with AI
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("document", file);

      const data = await uploadDocument(formData);

      setResult(data);
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Upload Section */}
      <div className="upload-card">
        <h1>BiztelAI Workflow System</h1>

        <p className="subtitle">AI-Powered Manufacturing Document Processing</p>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => {
            const selectedFile = e.target.files[0];

            setFile(selectedFile);

            if (selectedFile) {
              setPreview(URL.createObjectURL(selectedFile));
            }
          }}
        />

        {/* File Preview */}
        {preview && (
          <div className="preview-box">
            {file.type.includes("image") ? (
              <img src={preview} alt="Preview" className="file-preview" />
            ) : (
              <iframe
                src={preview}
                title="PDF Preview"
                className="pdf-preview"
              />
            )}
          </div>
        )}

        <button onClick={handleUpload}>
          {loading ? "Processing with Gemini AI..." : "Upload Document"}
        </button>
      </div>

      {/* Extraction Results */}
      {result && (
        <>
          <div className="section-card">
            <h2>AI Extraction Complete</h2>

            <div className="ocr-output">
              Gemini Vision successfully extracted operational manufacturing
              records.
            </div>
          </div>

          <div className="section-card">
            <h2>Validated Records</h2>

            <ReviewTable records={result.validatedRecords} />
          </div>
        </>
      )}
    </div>
  );
};

export default UploadPage;
