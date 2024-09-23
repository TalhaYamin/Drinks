import { createSlice } from "@reduxjs/toolkit";
import { fetchRootBeers, addRootBeer, addReview, fetchReviews } from "./apis";

const initialState = {
  rootBeers: [],
  status: "idle",
  error: null,
  total: 0,
};

const rootBeerSlice = createSlice({
  name: "rootBeers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRootBeers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRootBeers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rootBeers = action.payload.items || [];
        state.total = action.payload.total || 0;
      })
      .addCase(fetchRootBeers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addRootBeer.fulfilled, (state, action) => {
        state.rootBeers.push(action.payload);
        state.total += 1;
      })
      .addCase(addRootBeer.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const { drinkId, review } = action.payload;
        const rootBeer = state.rootBeers.find((beer) => beer.id === drinkId);
        if (rootBeer) {
          rootBeer.reviewCount += 1;
        }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        const { drinkId, reviews } = action.payload;
        const rootBeer = state.rootBeers.find((beer) => beer.id === drinkId);
        if (rootBeer) {
          rootBeer.reviews = reviews;
        }
        state.status = "succeeded";
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default rootBeerSlice.reducer;
