import { Box, Grid } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/users/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorState, successState } from "../redux/reducers/UserReducer";

function UserLayout() {
    const {sidebarToggle , errorAlert,successAlert} = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _token = JSON.parse(localStorage.getItem("userToken"));

    useEffect(()=>{
        if (errorAlert ) {
          localStorage.removeItem("error")
          toast.error(errorAlert,{
            onClose: () => dispatch(errorState(null)),
            autoClose:3000
          })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[errorAlert]);

      useEffect(()=>{
        if (successAlert ) {
          localStorage.removeItem("error")
          toast.success(successAlert,{
            onClose: () => dispatch(successState(null)),
            autoClose:3000
          })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[successAlert]);

    useEffect(()=>{
        if (!_token ) {
          navigate("/");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
    return(
    <Box overflow={"hidden"} >
         <Grid container>
                <Grid item xs={0} sm={0} md={sidebarToggle ? 0.8 : 2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} sm={12} md={sidebarToggle ? 11.2 : 10}>
                <Outlet />
                </Grid>
            </Grid>
            <ToastContainer />
    </Box>
    )
};

export default UserLayout;