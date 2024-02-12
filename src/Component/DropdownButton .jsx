import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const DropdownButton = () => {
  const [userdata, setuserdata] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userid = localStorage.getItem("user-data");
  const UserUrl = process.env.REACT_APP_API_KEY_USER;
  const sendRequest = async () => {
    const res = await axios.get(`${UserUrl}/getsingleuser/${userid}`);
    const data = await res.data.user;
    return data;
  };
  async function handlelogout(e) {
    dispatch(authActions.logout());
    navigate("/login");
  }
  useEffect(() => {
    sendRequest().then((data) => {
      setuserdata(data);
    });
  }, []);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="danger" id="dropdown-basic">
          {userdata.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {/* Dropdown items */}
          <Dropdown.Item>{userdata.email}</Dropdown.Item>
          <Dropdown.Item onClick={handlelogout}>Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownButton;
