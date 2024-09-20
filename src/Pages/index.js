import React from "react";
import { useDispatch } from "react-redux";
import { fetchRootBeers } from "../store/slices/drinkSlice/apis";
import CreateRootBeer from "../Components/createBeers";
import RootBeersList from "../Components/showBeers";

const RootBeers = () => {
  const dispatch = useDispatch();

  const refreshRootBeersList = () => {
    dispatch(fetchRootBeers({ offset: 0, length: 10 }));
  };

  return (
    <div>
      <CreateRootBeer onFormSubmit={refreshRootBeersList} />
      <RootBeersList />
    </div>
  );
};

export default RootBeers;
