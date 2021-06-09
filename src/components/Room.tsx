import {
  Button,
  CardContent,
  Grid,
  Grow,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoomType } from "../types/stuGroupTypes";
import useMySnackbar from "../hooks/useMySnackbar";
import { signaStudent, unSignaStudent } from "../reducers/studentReducer";
import MyCard from "./MyCard";

const useStyles = makeStyles((theme) =>
  createStyles({
    roomSigned: { backgroundColor: theme.palette.primary.main },
    roomPartSigned: { backgroundColor: theme.palette.primary.light },
    roomFullUnSigned: { backgroundColor: theme.palette.secondary.main },
  })
);

const Room = ({ room }: { room: RoomType }) => {
  const classes = useStyles();
  const [roomSign, setRoomSign] = React.useState(classes.roomFullUnSigned);
  const signedStudents = useSelector(
    (state: { student: Array<string> }) => state.student
  );
  React.useEffect(() => {
    const result = room.peoples.map((people) => {
      if (!signedStudents.includes(people.id)) {
        return false;
      } else return true;
    });
    if (result.includes(false)) {
      if (result.includes(true)) {
        setRoomSign(classes.roomPartSigned);
      } else {
        setRoomSign(classes.roomFullUnSigned);
      }
    } else setRoomSign(classes.roomSigned);
  }, [signedStudents]);

  return (
    <>
      <MyCard>
        <CardContent className={roomSign}>
          <Typography variant="h5" align="center" style={{ color: "#fff" }}>
            {room.code}
          </Typography>
          <Peoples peoples={room.peoples} />
        </CardContent>
      </MyCard>
    </>
  );
};

const Peoples = ({
  peoples,
}: {
  peoples: { id: string; name: string; signDate: string }[];
}) => {
  const dispatch = useDispatch();
  const signedStudents = useSelector(
    (state: { student: Array<string> }) => state.student
  );
  const snackbar = useMySnackbar();
  return (
    <Grid container direction="column" spacing={1}>
      {peoples.map((people, num) => {
        return (
          <Grid item key={people.id}>
            <Grow in timeout={num * 350}>
              <Button
                color={
                  signedStudents.includes(people.id) ? "primary" : "secondary"
                }
                style={{ width: 76.4, paddingLeft: 0, paddingRight: 0 }}
                variant="contained"
                onClick={(event) => {
                  event.preventDefault();
                  if (!localStorage.getItem("token"))
                    return snackbar.err("未登录，点击右上角登录");
                  signedStudents.includes(people.id)
                    ? dispatch(unSignaStudent(people.id))
                    : dispatch(signaStudent(people.id));
                }}
              >
                {people.name}
              </Button>
            </Grow>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Room;
