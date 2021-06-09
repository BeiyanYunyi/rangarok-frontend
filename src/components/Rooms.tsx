import { CardContent, Grid } from "@material-ui/core";
import React from "react";
import { v4 as uuid } from "uuid";
import { RoomsType } from "../types/stuGroupTypes"
import MyCard from "./MyCard";
import Room from "./Room";

const Rooms = ({ rooms }: { rooms: RoomsType }) => {
  return (
    <MyCard>
      <CardContent>
        <Grid
          container
          direction="row"
          spacing={1}
          justify="center"
          alignItems="flex-start"
        >
          {rooms.map((room) => (
            <Grid item key={uuid()}>
              <Room room={room} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </MyCard>
  );
};

export default Rooms;
