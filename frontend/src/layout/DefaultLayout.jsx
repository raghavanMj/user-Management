import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./layout.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorState, successState } from "../Redux/Actions/userActions";
import ResponsiveAppBar from "./header";

function DefaultLayout() {
  const { errorAlert, successAlert } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _token = JSON.parse(localStorage.getItem("userToken"));

  useEffect(() => {
    if (errorAlert) {
      localStorage.removeItem("error");
      toast.error(errorAlert, {
        onClose: () => dispatch(errorState(null)),
        autoClose: 3000,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorAlert]);

  useEffect(() => {
    if (successAlert) {
      localStorage.removeItem("error");
      toast.success(successAlert, {
        onClose: () => dispatch(successState(null)),
        autoClose: 3000,
      });
    }
  }, [successAlert]);

  useEffect(() => {
    if (!_token) {
      navigate("/login");
    } else {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_token]);

  return (
    <Box className={classes.layout_container}>
      {window.location.pathname !== "/login" && (
        <div className={classes.header}>
          <ResponsiveAppBar />
        </div>
      )}
      <div
        className={
          window.location.pathname === "/login"
            ? classes.login_container
            : classes.main_container
        }
      >
        <Outlet />
      </div>
      <ToastContainer />
    </Box>
  );
}

export default DefaultLayout;
