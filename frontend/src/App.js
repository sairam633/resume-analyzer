import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ResumeUploader from "./components/ResumeUploader";
import ResumeDetails from "./components/ResumeDetails";
import PastResumesTable from "./components/PastResumesTable";
import styled from "styled-components";

const Page = styled.div`
  padding: 20px;
`;

function App() {
  const [activeTab, setActiveTab] = useState("analyze");
  const [analysis, setAnalysis] = useState(null);

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Page>
        {activeTab === "analyze" ? (
  <>
    <ResumeUploader onUploadSuccess={setAnalysis} />
    {analysis && <ResumeDetails data={analysis} />}
  </>
) : (
  <PastResumesTable />
)}
      </Page>
    </>
  );
}

export default App;
