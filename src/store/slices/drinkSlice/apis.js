import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRootBeers = createAsyncThunk(
  "rootBeers/fetchRootBeers",
  async ({ offset = 0, length = 10, name = "" }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/drinks?offset=${offset}&length=${length}&name=${name}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch root beers"
      );
    }
  }
);

export const addRootBeer = createAsyncThunk(
  "rootBeers/addRootBeer",
  async (newRootBeer, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/drinks`,
        newRootBeer
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add root beer");
    }
  }
);

export const uploadPicture = createAsyncThunk(
  "rootBeers/uploadPicture",
  async ({ drinkId, image }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("picture", image);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/drinks/${drinkId}/pictures`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to upload picture"
      );
    }
  }
);

export const fetchReviews = createAsyncThunk(
  "rootBeers/fetchReviews",
  async ({ drinkId, offset = 0, length = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/drinks/${drinkId}/reviews?offset=${offset}&length=${length}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch reviews");
    }
  }
);

export const addReview = createAsyncThunk(
  "rootBeers/addReview",
  async ({ drinkId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/drinks/${drinkId}/reviews`,
        reviewData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add review");
    }
  }
);
