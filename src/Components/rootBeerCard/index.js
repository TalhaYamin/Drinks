import React from "react";
import {
  CardContainer,
  CardTitle,
  CardDescription,
  CardDetails,
  CardImage,
} from "./styled";

const RootBeerCard = ({ rootBeer }) => {
  const imageUrl =
    rootBeer.Pictures.length > 0
      ? `${process.env.REACT_APP_BASE_URL}/${rootBeer.Pictures[0].path}`
      : "default-image-url.jpg";
  return (
    <CardContainer>
      <CardImage src={imageUrl} alt={rootBeer.name} />
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
