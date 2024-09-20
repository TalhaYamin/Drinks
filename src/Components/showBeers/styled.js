import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;
`;

export const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 16px;
  color: #333;
`;
