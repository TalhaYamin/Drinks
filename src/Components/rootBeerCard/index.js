import React, { useState } from "react";
import {
  CardContainer,
  CardTitle,
  CardDescription,
  CardDetails,
  CardImage,
  Star,
  StarsContainer,
  ReviewForm,
  SubmitButton,
  ReviewList,
  ReviewItem,
  ToggleReviewButton,
} from "./styled";
import { FaPlus, FaTimes } from "react-icons/fa";

const RootBeerCard = ({ rootBeer, reviews, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const imageUrl =
    rootBeer.Pictures.length > 0
      ? `${process.env.REACT_APP_BASE_URL}/${rootBeer.Pictures[0].path}`
      : "default-image-url.jpg";

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      user_name: "Anonymous",
      description,
      rating,
    };
    onAddReview(reviewData);
    setDescription("");
    setRating(0);
    setIsReviewOpen(false);
  };

  const renderStars = (averageRating) => {
    const filledStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 !== 0;

    return (
      <>
        {[...Array(5)].map((_, index) => {
          const starIndex = index + 1;
          return (
            <Star
              key={index}
              isSelected={starIndex <= filledStars}
              style={{ color: starIndex <= filledStars ? "#FFD700" : "#ccc" }}
            >
              {starIndex <= filledStars
                ? "★"
                : starIndex === filledStars + 1 && hasHalfStar
                ? "☆"
                : "☆"}
            </Star>
          );
        })}
      </>
    );
  };

  const toggleReviewForm = () => {
    setIsReviewOpen(!isReviewOpen);
  };

  return (
    <CardContainer>
      <CardImage src={imageUrl} alt={rootBeer.name} />
      <CardTitle>{rootBeer.name}</CardTitle>
      <CardDescription>{rootBeer.description}</CardDescription>
      <CardDetails>Reviews: {rootBeer.reviewCount}</CardDetails>
      <CardDetails>
        Rating:{" "}
        {rootBeer.reviewAverageRating
          ? renderStars(rootBeer.reviewAverageRating)
          : "No rating"}
      </CardDetails>

      <ToggleReviewButton onClick={toggleReviewForm}>
        {isReviewOpen ? (
          <>
            <FaTimes />
          </>
        ) : (
          <>
            <FaPlus /> AddReview
          </>
        )}
      </ToggleReviewButton>

      {isReviewOpen && (
        <>
          <StarsContainer>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => handleStarClick(star)}
                isSelected={star <= rating}
              >
                ★
              </Star>
            ))}
          </StarsContainer>

          <ReviewForm onSubmit={handleSubmit}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your review..."
              style={{ width: "90%" }}
            />
            <SubmitButton type="submit">Submit Review</SubmitButton>
          </ReviewForm>
        </>
      )}

      <ReviewList>
        {reviews?.map((review, index) => (
          <ReviewItem key={index}>
            <strong>{review.user_name}</strong> - {review.rating} stars:{" "}
            {review.description}
          </ReviewItem>
        ))}
      </ReviewList>
    </CardContainer>
  );
};

export default RootBeerCard;
