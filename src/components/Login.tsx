import React from "react";
import {
  IconButton,
  Avatar,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { green, red } from "@material-ui/core/colors";
import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, changeUsername } from "../reducers/userReducer";
import axios from "axios";
import URL from "../data/URL";
import useMySnackbar from "../hooks/useMySnackbar";
const useStyles = makeStyles((_theme) => ({
  loginIconStyle: {
    position: "fixed",
    right: 0,
  },
  red: { color: "#fff", backgroundColor: red[500] },
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
}));

const Login = () => {
  const classes = useStyles();
  const [loginFormOpen, setLoginFormOpen] = React.useState(false);
  const [logoutFormOpen, setLogoutFormOpen] = React.useState(false);
  const [loggedin, setLoggedin] = React.useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedin(true);
  }, []);
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!loggedin) {
      setLoginFormOpen(true);
    } else {
      setLogoutFormOpen(true);
    }
  };
  return (
    <>
      <IconButton className={classes.loginIconStyle} onClick={handleClick}>
        <Avatar className={loggedin ? classes.green : classes.red}>
          <AccountCircleIcon />
        </Avatar>
      </IconButton>
      <LoginForm
        open={loginFormOpen}
        setOpen={setLoginFormOpen}
        setLoggedin={setLoggedin}
      />
      <LogoutForm
        open={logoutFormOpen}
        setOpen={setLogoutFormOpen}
        setLoggedin={setLoggedin}
      />
    </>
  );
};

const LoginForm = ({
  open,
  setOpen,
  setLoggedin,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const user = useSelector(
    (state: { user: Record<string, any> }) => state.user
  );
  const snackbar = useMySnackbar();
  const handleClose = async () => {
    setOpen(false);
    try {
      const res = await axios.post(`${URL}/login`, { password: user.password });
      dispatch(changeUsername(res.data.user));
      localStorage.setItem("token", res.data.token);
      setLoggedin(true);
      snackbar.success("登录成功");
    } catch (err) {
      console.error(err.message);
      snackbar.err("登录失败，请检查密码");
    }
  };
  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">登录</DialogTitle>
        <DialogContent>
          <DialogContentText>你把你密码给我交了</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="密码"
            type="password"
            fullWidth
            onChange={(event: any) => {
              dispatch(changePassword(event.target.value));
            }}
            style={{ color: "#1976d2" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const LogoutForm = ({
  open,
  setOpen,
  setLoggedin,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const handleConfirm = async () => {
    setOpen(false);
    dispatch(changePassword(""));
    localStorage.removeItem("token");
    setLoggedin(false);
  };
  const handleCancel = async () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">注销</DialogTitle>
        <DialogContent>
          <DialogContentText>当真退出登录？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            取消
          </Button>
          <Button onClick={handleConfirm} color="secondary">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
