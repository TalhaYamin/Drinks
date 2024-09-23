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

export const ReviewList = styled.div`
  margin-top: 10px;
`;

export const ReviewItem = styled.div`
  padding: 5px;
  border-bottom: 1px solid #ccc;
`;
export const StarsContainer = styled.div`
  display: flex;
  margin: 10px 0;
`;

export const Star = styled.span`
  font-size: 24px;
  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? "gold" : "gray")};

  &:hover {
    color: gold;
  }
`;

export const ReviewForm = styled.form`
  margin-top: 10px;
`;

export const SubmitButton = styled.button`
  margin-top: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;
