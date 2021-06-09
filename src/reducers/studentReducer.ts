import axios from "axios";
import deleteArrayElement from "../utils/deleteArrayElement";
import URL from "../data/URL";
import studentService from "../services/studentService";

const studentReducer = (
  state: Array<string> = [],
  action: { type: string; data: string }
) => {
  switch (action.type) {
    case "signaStudent":
      return state.concat(action.data);
    case "unSignaStudent":
      return deleteArrayElement(state, action.data);
    case "initStudents":
      return action.data;
    default:
      return state;
  }
};

export const signaStudent = (id: string) => {
  return async (dispatch: any) => {
    studentService.setToken(localStorage.getItem("token"));
    const stuId = await studentService.studentSignById(id);
    dispatch({
      type: "signaStudent",
      data: stuId,
    });
  };
};
export const unSignaStudent = (id: string) => {
  return async (dispatch: any) => {
    studentService.setToken(localStorage.getItem("token"));
    const stuId = await studentService.studentUnsignById(id);
    dispatch({
      type: "unSignaStudent",
      data: stuId,
    });
  };
};
export const initStudents = () => {
  return async (dispatch: any) => {
    const students = await axios.get(`${URL}/getSignedStudents`);
    dispatch({ type: "initStudents", data: students.data });
  };
};
export default studentReducer;
