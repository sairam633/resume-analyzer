// frontend/src/components/PastResumesTable.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ResumeDetails from "./ResumeDetails";
import Modal from "react-modal";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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

const Button = styled.button`
  background: #2c7be5;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

Modal.setAppElement("#root");

const API_BASE = process.env.REACT_APP_API_URL;

function PastResumesTable() {
  const [resumes, setResumes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/resumes`)
      .then((res) => setResumes(res.data.data))
      .catch(() => setResumes([]));
  }, []);

  return (
    <>
      <h2>📜 Past Resumes</h2>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>File</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Rating</Th>
            <Th>Uploaded</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((r) => (
            <tr key={r.id}>
              <Td>{r.id}</Td>
              <Td>{r.file_name}</Td>
              <Td>{r.name || "N/A"}</Td>
              <Td>{r.email || "N/A"}</Td>
              <Td>{r.resume_rating || "N/A"}</Td>
              <Td>{new Date(r.uploaded_at).toLocaleString()}</Td>
              <Td>
                <Button onClick={() => setSelected(r.id)}>View Details</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        isOpen={!!selected}
        onRequestClose={() => setSelected(null)}
        style={{
          content: { maxWidth: "900px", margin: "auto", inset: "50px" },
        }}
      >
        <Button onClick={() => setSelected(null)}>Close</Button>
        {selected && <ResumeDetailsWrapper id={selected} />}
      </Modal>
    </>
  );
}

function ResumeDetailsWrapper({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/resumes/${id}`)
      .then((res) => setData(res.data.data))
      .catch(() => setData(null));
  }, [id]);

  return data ? <ResumeDetails data={data} /> : <p>Loading...</p>;
}

export default PastResumesTable;
