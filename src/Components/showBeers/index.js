import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRootBeersError,
  getRootBeersStatus,
  getRootBeersTotal,
  selectAllRootBeers,
} from "../../store/slices/drinkSlice/selector";
import { addReview, fetchRootBeers } from "../../store/slices/drinkSlice/apis";
import {
  GridContainer,
  Title,
  SearchInput,
  SearchButton,
  ResetButton,
  PaginationContainer,
  PaginationButton,
} from "./styled";
import RootBeerCard from "../rootBeerCard";

const RootBeersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rootBeers = useSelector(selectAllRootBeers);
  const rootBeersStatus = useSelector(getRootBeersStatus);
  const error = useSelector(getRootBeersError);
  const total = useSelector(getRootBeersTotal);

  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(
      fetchRootBeers({
        offset: (currentPage - 1) * itemsPerPage,
        length: itemsPerPage,
        name: query,
      })
    );
  }, [dispatch, currentPage, query]);

  const handleSearch = () => {
    setCurrentPage(1);
    dispatch(
      fetchRootBeers({ offset: 0, length: itemsPerPage, name: searchTerm })
    );
    setSearchTerm("");
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
    setQuery("");
    setCurrentPage(1);
    dispatch(fetchRootBeers({ offset: 0, length: itemsPerPage, name: "" }));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleClick = (drinkId) => {
    navigate(`/drinks/${drinkId}`);
    console.log(drinkId, "drisssssss");
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
          <SearchButton onClick={handleSearch}>Search</SearchButton>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
        </div>
        <GridContainer>
          {rootBeers?.map((rootBeer) => (
            <RootBeerCard
              key={rootBeer.id}
              rootBeer={rootBeer}
              reviews={rootBeer.reviews || []}
              onClick={() => handleClick(rootBeer.id)}
              onAddReview={async (reviewData) => {
                await dispatch(addReview({ drinkId: rootBeer.id, reviewData }));
              }}
            />
          ))}
        </GridContainer>
        <PaginationContainer>
          <PaginationButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </PaginationButton>
          <PaginationButton
            onClick={handleNextPage}
            disabled={rootBeers.length < itemsPerPage}
          >
            Next
          </PaginationButton>
        </PaginationContainer>
      </div>
    );
  } else if (rootBeersStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
};

export default RootBeersList;
