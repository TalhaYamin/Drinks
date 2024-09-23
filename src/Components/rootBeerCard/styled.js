import styled from "styled-components";

export const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9f9f9;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

export const CardTitle = styled.h3`
  font-size: 1.2em;
  margin: 10px;
`;

export const CardDescription = styled.p`
  font-size: 1em;
  margin: 10px;
`;

export const CardDetails = styled.p`
  margin: 0;
  font-size: 0.9em;
  color: #999;
`;
