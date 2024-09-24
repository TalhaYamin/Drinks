import React, { useState } from "react";
import { Card, Button, Rate, Input, List } from "antd";
import { FaPlus, FaTimes } from "react-icons/fa";

const { Meta } = Card;
const { TextArea } = Input;

const RootBeerCard = ({ rootBeer, reviews, onAddReview, onClick }) => {
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

  const toggleReviewForm = () => {
    setIsReviewOpen(!isReviewOpen);
  };

  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={<img alt={rootBeer.name} src={imageUrl} />}
    >
      <Meta
        title={
          <span
            style={{ cursor: "pointer", color: "Red", fontSize: "18px" }}
            onClick={onClick}
          >
            {rootBeer.name}
          </span>
        }
        description={rootBeer.description}
      />
      <div style={{ marginTop: 16 }}>
        <p>Reviews: {rootBeer.reviewCount}</p>
        <p>
          Rating:{" "}
          {rootBeer.reviewAverageRating ? (
            <Rate disabled value={rootBeer.reviewAverageRating} />
          ) : (
            "**No rating**"
          )}
        </p>
      </div>
      <Button
        type="primary"
        onClick={toggleReviewForm}
        style={{ marginTop: 16 }}
      >
        {isReviewOpen ? (
          <FaTimes />
        ) : (
          <>
            <FaPlus /> Add Review
          </>
        )}
      </Button>
      {isReviewOpen && (
        <div style={{ marginTop: 16 }}>
          <Rate
            onChange={handleStarClick}
            value={rating}
            style={{ marginBottom: 8 }}
          />
          <TextArea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your review..."
          />
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ marginTop: 8 }}
          >
            Submit Review
          </Button>
        </div>
      )}
      {reviews?.length > 0 && (
        <List
          style={{ marginTop: 16 }}
          header={<div>Reviews</div>}
          bordered
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item>
              <strong>{review.user_name}</strong> - {review.rating} stars:{" "}
              {review.description}
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default RootBeerCard;
