import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDrinkById } from "../../store/slices/drinkSlice/apis";
import {
  selectDrinkDetails,
  getDrinkStatus,
  getDrinkError,
} from "../../store/slices/drinkSlice/selector";

const DrinkDetails = () => {
  const dispatch = useDispatch();
  const { drinkId } = useParams();
  const drinkDetails = useSelector(selectDrinkDetails);
  const status = useSelector(getDrinkStatus);
  const error = useSelector(getDrinkError);

  useEffect(() => {
    if (drinkId) {
      dispatch(fetchDrinkById(drinkId));
    }
  }, [dispatch, drinkId]);

  if (status === "loading") {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (status === "failed") {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      {drinkDetails ? (
        <>
          {drinkDetails.Pictures && drinkDetails.Pictures.length > 0 && (
            <img
              src={`${process.env.REACT_APP_BASE_URL}/${drinkDetails.Pictures[0].path}`}
              alt={`Cover of ${drinkDetails.name}`}
              style={styles.coverImage}
            />
          )}

          <h2 style={styles.title}>{drinkDetails.name}</h2>

          <p style={styles.description}>{drinkDetails.description}</p>
          <div style={styles.details}>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(drinkDetails.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(drinkDetails.updatedAt).toLocaleString()}
            </p>
            <p>
              <strong>Review Count:</strong> {drinkDetails.reviewCount}
            </p>
          </div>

          <div style={styles.ratings}>
            <p>
              <strong>Average Rating:</strong>{" "}
              {drinkDetails.reviewAverageRating} ⭐
            </p>
          </div>
        </>
      ) : (
        <p>No drink details available</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  coverImage: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2rem",
    margin: "10px 0",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "15px",
    color: "#555",
  },
  details: {
    fontSize: "1rem",
    marginBottom: "20px",
    color: "#333",
  },
  ratings: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#FFAA00", // Gold color for ratings
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
    padding: "20px",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: "1.5rem",
    padding: "20px",
  },
};

export default DrinkDetails;
