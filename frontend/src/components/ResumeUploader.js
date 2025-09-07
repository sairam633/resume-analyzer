// frontend/src/components/ResumeUploader.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  background: #f9f9f9;
`;

const FileInput = styled.input`
  margin: 20px 0;
`;

const Button = styled.button`
  background: #2c7be5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const Status = styled.div`
  margin-top: 15px;
  font-weight: bold;
  color: ${({ success }) => (success ? "green" : "red")};
`;

const Loader = styled.div`
  margin: 15px auto;
  border: 4px solid #ddd;
  border-top: 4px solid #2c7be5;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const API_BASE = process.env.REACT_APP_API_URL;

function ResumeUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file!");
      return;
    }

    setLoading(true);
    setStatus("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(`${API_BASE}/api/resumes/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("Upload successful!");
      onUploadSuccess(res.data.data); // pass analysis result to parent
    } catch (err) {
      console.error(err);
      setStatus("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>📂 Upload Resume</h2>
      <FileInput type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <Button onClick={handleUpload}>Upload</Button>

      {loading && <Loader />}
      {status && <Status success={status.includes("successful")}>{status}</Status>}
    </Container>
  );
}

export default ResumeUploader;
