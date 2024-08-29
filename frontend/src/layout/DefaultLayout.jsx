import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./layout.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorState, successState } from "../Redux/Actions/userActions";

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

  return (
    <Box className={classes.layout_container}>
      <Outlet />
      <ToastContainer />
    </Box>
  );
}

export default DefaultLayout;
