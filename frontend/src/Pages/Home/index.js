import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from "@mui/material";
import classes from "./home.module.css";
import { useSelector } from "react-redux";
import { getUserList } from "../../Redux/Actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeIndex = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { usersList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div>
      <Container>
        <div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        <Table>
          <TableHead className={classes.TableHeaderRow}>
            <TableRow>
              <TableCell flex={1} style={{ minWidth: 125 }}>
                <span>User Name</span>
              </TableCell>
              <TableCell flex={1} style={{ minWidth: 125 }}>
                <span>Phone</span>
              </TableCell>
              <TableCell flex={1} style={{ minWidth: 125 }}>
                <span>Email</span>
              </TableCell>
              <TableCell flex={1} style={{ minWidth: 125 }}>
                <span>Role</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList &&
              usersList.length > 0 &&
              usersList.map((user) => (
                <TableRow>
                  <TableCell flex={1} style={{ minWidth: 125 }}>
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                  </TableCell>
                  <TableCell flex={1} style={{ minWidth: 125 }}>
                    <span>{user.phone}</span>
                  </TableCell>
                  <TableCell flex={1} style={{ minWidth: 125 }}>
                    <span>{user.email}</span>
                  </TableCell>
                  <TableCell flex={1} style={{ minWidth: 125 }}>
                    <span>{user.role}</span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
};

export default HomeIndex;
