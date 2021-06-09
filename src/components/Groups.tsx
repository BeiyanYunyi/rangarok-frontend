import React from "react";
import { Typography } from "@material-ui/core";
import { ItemofStudentsType, ListofStudentsType } from "../types/stuGroupTypes";
import Places from "./Places";
import { useDispatch } from "react-redux";
import { initStudents } from "../reducers/studentReducer";
import groupService from "../services/groupService";
const Groups = ({ groups }: { groups: ListofStudentsType }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(initStudents());
  }, []);
  return (
    <>
      {groups.map((group) => (
        <Group group={group} key={group.name} />
      ))}
    </>
  );
};
const Group = ({ group }: { group: ItemofStudentsType }) => {
  const [groupInfo, setGroupInfo] = React.useState({
    name: "",
    signed: 0,
    total: 0,
  });
  React.useEffect(() => {
    groupService.getGroupInfo(group.name).then((data) => {
      setGroupInfo(data);
    });
  }, []);
  return (
    <>
      <Typography variant="h3" align="center" style={{ marginTop: 8 }}>
        {group.name}
      </Typography>
      <Typography variant="h6" align="center">
        签到数：{groupInfo.signed}/{groupInfo.total}
      </Typography>
      <Places places={group.places} />
    </>
  );
};
export default Groups;
