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
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {drinkDetails ? (
        <div>
          <h2>{drinkDetails.name}</h2>
          <p>Review Count: {drinkDetails.reviewCount}</p>
          <p>Average Rating: {drinkDetails.reviewAverageRating}</p>
        </div>
      ) : (
        <p>No drink details available</p>
      )}
    </div>
  );
};

export default DrinkDetails;
