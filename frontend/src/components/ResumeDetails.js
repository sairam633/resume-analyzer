import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h3`
  color: #2c7be5;
  margin-bottom: 10px;
`;

const Skill = styled.span`
  background: #eaf3ff;
  color: #2c7be5;
  padding: 5px 10px;
  border-radius: 20px;
  margin: 3px;
  display: inline-block;
`;

function ResumeDetails({ data }) {
  if (!data) return null;

  return (
    <Container>
      <Section>
        <Title>👤 Candidate Info</Title>
        <p><b>Name:</b> {data.name || "N/A"}</p>
        <p><b>Email:</b> {data.email || "N/A"}</p>
        <p><b>Phone:</b> {data.phone || "N/A"}</p>
        <p><b>LinkedIn:</b> {data.linkedin_url || "N/A"}</p>
        <p><b>Portfolio:</b> {data.portfolio_url || "N/A"}</p>
      </Section>

      <Section>
        <Title>📄 Summary</Title>
        <p>{data.summary || "N/A"}</p>
      </Section>

      <Section>
        <Title>💼 Work Experience</Title>
        {data.work_experience?.length > 0 ? (
          data.work_experience.map((job, idx) => (
            <div key={idx}>
              <p><b>{job.role}</b> at {job.company} ({job.duration})</p>
              <ul>
                {job.description?.map((desc, i) => <li key={i}>{desc}</li>)}
              </ul>
            </div>
          ))
        ) : (
          <p>No work experience provided.</p>
        )}
      </Section>

      <Section>
        <Title>🎓 Education</Title>
        {data.education?.length > 0 ? (
          data.education.map((edu, idx) => (
            <p key={idx}>{edu.degree} - {edu.institution} ({edu.graduation_year})</p>
          ))
        ) : (
          <p>No education details provided.</p>
        )}
      </Section>

      <Section>
        <Title>🛠 Technical Skills</Title>
        {data.technical_skills?.length > 0 ? (
          data.technical_skills.map((skill, idx) => <Skill key={idx}>{skill}</Skill>)
        ) : (
          <p>No technical skills provided.</p>
        )}
      </Section>

      <Section>
        <Title>🤝 Soft Skills</Title>
        {data.soft_skills?.length > 0 ? (
          data.soft_skills.map((skill, idx) => <Skill key={idx}>{skill}</Skill>)
        ) : (
          <p>No soft skills provided.</p>
        )}
      </Section>

      <Section>
        <Title>⭐ Resume Rating</Title>
        <p>{data.resume_rating || "N/A"} / 10</p>
      </Section>

      <Section>
        <Title>⚠️ Improvement Areas</Title>
        <p>{data.improvement_areas || "N/A"}</p>
      </Section>

      <Section>
        <Title>📈 Upskill Suggestions</Title>
        {data.upskill_suggestions?.length > 0 ? (
          <ul>
            {data.upskill_suggestions.map((sug, idx) => <li key={idx}>{sug}</li>)}
          </ul>
        ) : (
          <p>No suggestions provided.</p>
        )}
      </Section>
    </Container>
  );
}

export default ResumeDetails;
