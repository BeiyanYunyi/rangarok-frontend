import React from "react";
import { Container } from "@material-ui/core";
import { Provider } from "react-redux";
import Groups from "./components/Groups";
import store from "./controllers/stateCombiner";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import myTheme from "./data/theme.json";
import Login from "./components/Login";
import MySnackbarProvider from "./components/MySnackbarProvider";
import axios from "axios";
import URL from "./data/URL";
import { ListofStudentsType } from "./types/stuGroupTypes";

const App = () => {
  const theme = createMuiTheme(myTheme);
  const [listofStudents, setListofStudents]: [
    ListofStudentsType,
    React.Dispatch<React.SetStateAction<ListofStudentsType>>
  ] = React.useState([]) as unknown as [
    ListofStudentsType,
    React.Dispatch<React.SetStateAction<ListofStudentsType>>
  ];
  React.useEffect(() => {
    const newList = axios.get(`${URL}/getInf/getStudentsByRoom`) as Promise<{
      data: ListofStudentsType;
    }>;
    newList.then((list: { data: ListofStudentsType }) => {
      setListofStudents(list.data);
    });
  }, []);
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <MySnackbarProvider>
          <Login />
          <Container>
            <Groups groups={listofStudents} />
          </Container>
        </MySnackbarProvider>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
