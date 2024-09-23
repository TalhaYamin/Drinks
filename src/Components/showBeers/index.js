import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getRootBeersError,
  getRootBeersStatus,
  getRootBeersTotal,
  selectAllRootBeers,
} from "../../store/slices/drinkSlice/selector";
import { fetchRootBeers } from "../../store/slices/drinkSlice/apis";
import RootBeerCard from "../rootBeerCard";
import {
  GridContainer,
  Title,
  SearchInput,
  SearchButton,
  ResetButton,
} from "./styled";

const RootBeersList = () => {
  const dispatch = useDispatch();
  const rootBeers = useSelector(selectAllRootBeers);
  const rootBeersStatus = useSelector(getRootBeersStatus);
  const error = useSelector(getRootBeersError);
  const total = useSelector(getRootBeersTotal);

  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchRootBeers({ offset: 0, length: 10, name: "" }));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchRootBeers({ offset: 0, length: 10, search: searchTerm }));
    setSearchTerm("");
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
    handleSearch();
  };

  const handleReset = () => {
    setSearchTerm("");
    setQuery("");
    dispatch(fetchRootBeers({ offset: 0, length: 10, name: "" }));
  };

  let content;

  if (rootBeersStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (rootBeersStatus === "succeeded") {
    content = (
      <div>
        <Title>Total Root Beers: {total}</Title>
        <div>
          <SearchInput
            type="text"
            placeholder="Search Root Beers"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <SearchButton onClick={handleSubmit}>Search</SearchButton>
          <ResetButton onClick={handleReset}>Reset</ResetButton>{" "}
        </div>
        <GridContainer>
          {rootBeers?.map((rootBeer) => (
            <RootBeerCard key={rootBeer.id} rootBeer={rootBeer} />
          ))}
        </GridContainer>
      </div>
    );
  } else if (rootBeersStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
};

export default RootBeersList;
