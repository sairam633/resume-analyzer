import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  background: #2c7be5;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const Tabs = styled.div`
  display: flex;
  gap: 20px;
`;

const Tab = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 5px 10px;
  border-bottom: ${({ active }) => (active ? "2px solid yellow" : "none")};

  &:hover {
    opacity: 0.8;
  }
`;

function Navbar({ activeTab, setActiveTab }) {
  return (
    <Nav>
      <Brand>Resume Analyzer</Brand>
      <Tabs>
        <Tab
          active={activeTab === "analyze"}
          onClick={() => setActiveTab("analyze")}
        >
          Analyze Resume
        </Tab>
        <Tab
          active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        >
          History
        </Tab>
      </Tabs>
    </Nav>
  );
}

export default Navbar;
