import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getRootBeersError,
  getRootBeersStatus,
  getRootBeersTotal,
  selectAllRootBeers,
} from "../../store/slices/drinkSlice/selector";
import { fetchRootBeers } from "../../store/slices/drinkSlice/apis";
import RootBeerCard from "../rootBeerCard";
import { GridContainer, Title } from "./styled";

const RootBeersList = () => {
  const dispatch = useDispatch();
  const rootBeers = useSelector(selectAllRootBeers);
  const rootBeersStatus = useSelector(getRootBeersStatus);
  const error = useSelector(getRootBeersError);
  const total = useSelector(getRootBeersTotal);

  useEffect(() => {
    if (rootBeersStatus === "idle") {
      dispatch(fetchRootBeers({ offset: 0, length: 10 }));
    }
  }, [dispatch, rootBeersStatus]);

  let content;

  if (rootBeersStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (rootBeersStatus === "succeeded") {
    content = (
      <div>
        <Title>Total Root Beers: {total}</Title>
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
