import React from "react";
import {
  CardContainer,
  CardTitle,
  CardDescription,
  CardDetails,
} from "./styled";

const RootBeerCard = ({ rootBeer }) => {
  return (
    <CardContainer>
      <CardTitle>{rootBeer.name}</CardTitle>
      <CardDescription>{rootBeer.description}</CardDescription>
      <CardDetails>Reviews: {rootBeer.reviewCount}</CardDetails>
      <CardDetails>
        Rating: {rootBeer.reviewAverageRating ?? "No rating"}
      </CardDetails>
    </CardContainer>
  );
};

export default RootBeerCard;
