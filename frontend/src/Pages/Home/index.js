import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { Table } from "antd";
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

  const columns = [
    {
      title: "User Name",
      dataIndex: "firstName", // This will be the primary key, but we'll combine both names
      key: "name",
      render: (text, record) => `${record.firstName} ${record.lastName}`, // Combining first and last name
      sorter: (a, b) => a.firstName.localeCompare(b.firstName), // Sorting based on firstName
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      filters: [
        {
          text: "User",
          value: "user",
        },
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "Guest",
          value: "guest",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Container>
        <div className={`mt-3`}>
          <Typography variant="h4" className={classes.title}>
            Users List
          </Typography>
        </div>
        <Table columns={columns} dataSource={usersList} onChange={onChange} />
      </Container>
    </div>
  );
};

export default HomeIndex;
