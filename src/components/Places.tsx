import React from "react";
import { PlacesType, PlaceType } from "../types/stuGroupTypes";
import { Typography } from "@material-ui/core";
import Rooms from "./Rooms";
const Places = ({ places }: { places: PlacesType }) => {
  return (
    <>
      {places.map((place) => (
        <Place place={place} key={place.name} />
      ))}
    </>
  );
};
const Place = ({ place }: { place: PlaceType }) => {
  return (
    <>
      <Typography variant="h4" align="center">
        {place.name}
      </Typography>
      <Rooms rooms={place.rooms} />
    </>
  );
};
export default Places;
