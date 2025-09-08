// frontend/src/components/PastResumesTable.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ResumeDetails from "./ResumeDetails";
import Modal from "react-modal";

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 20px auto;
  padding: 10px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  margin: 0;
`;

const ClearButton = styled.button`
  background: #ff5c5c;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  &:hover { opacity: 0.9; }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 6px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background: #2c7be5;
  color: white;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const ActionButton = styled.button`
  background: #2c7be5;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`;

Modal.setAppElement("#root");

function PastResumesTable() {
  const [resumes, setResumes] = useState([]);
  const [selected, setSelected] = useState(null);

  // load local history once on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const history = JSON.parse(localStorage.getItem("resumeHistory")) || [];
    setResumes(history);
  };

  const handleClearHistory = () => {
    const ok = window.confirm(
      "Are you sure you want to clear all local history? This will remove all resumes stored in this browser."
    );
    if (!ok) return;
    localStorage.removeItem("resumeHistory");
    setResumes([]);
    setSelected(null);
  };

  const handleView = (item) => {
    setSelected(item);
  };

  return (
    <Wrapper>
      <Controls>
        <Title>📜 Past Resumes (This Browser Only)</Title>
        <ClearButton onClick={handleClearHistory}>Clear History</ClearButton>
      </Controls>

      {resumes.length === 0 ? (
        <p>No resumes found in this browser. Upload a resume to start analyzing.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>File</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Rating</Th>
              <Th>Uploaded</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((r, idx) => (
              <tr key={idx}>
                <Td>{idx + 1}</Td>
                <Td>{r.file_name || "N/A"}</Td>
                <Td>{r.name || "N/A"}</Td>
                <Td>{r.email || "N/A"}</Td>
                <Td>{r.resume_rating ?? "N/A"}</Td>
                <Td>{r.uploaded_at ? new Date(r.uploaded_at).toLocaleString() : "N/A"}</Td>
                <Td>
                  <ActionButton onClick={() => handleView(r)}>View Details</ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal
        isOpen={!!selected}
        onRequestClose={() => setSelected(null)}
        style={{ content: { maxWidth: "900px", margin: "auto", inset: "50px" } }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <ActionButton onClick={() => setSelected(null)}>Close</ActionButton>
          <ClearButton
            onClick={() => {
              // optionally allow deletion of the single selected item from localstorage
              const ok = window.confirm("Remove this resume from local history?");
              if (!ok) return;
              const history = JSON.parse(localStorage.getItem("resumeHistory")) || [];
              const filtered = history.filter((h) => !(h.file_name === selected.file_name && h.uploaded_at === selected.uploaded_at));
              localStorage.setItem("resumeHistory", JSON.stringify(filtered));
              loadHistory();
              setSelected(null);
            }}
            style={{ background: "#ff7b7b" }}
          >
            Remove From History
          </ClearButton>
        </div>

        {selected ? <ResumeDetails data={selected} /> : <p>Loading...</p>}
      </Modal>
    </Wrapper>
  );
}

export default PastResumesTable;
