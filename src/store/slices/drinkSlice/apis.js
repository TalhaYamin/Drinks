import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRootBeers = createAsyncThunk(
  "rootBeers/fetchRootBeers",
  async ({ offset = 0, length = 10 }, { rejectWithValue }) => {
    console.log("BASE_URL:", process.env.REACT_APP_BASE_URL);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/drinks?offset=${offset}&length=${length}`
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
        `${process.env.REACT_APP_BASE_URL}/drinks`,
        newRootBeer
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add root beer");
    }
  }
);
