import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { users } from "../data/usersData";
import { loginUser } from "../redux/actions";

function Login({ dispatch }) {
  const [inputUser, setInputUser] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const { loading } = useSelector((state) => state);
  const history = useHistory();
  const checkUser = (userName) => {
    const userDtls = users.filter((e) => e.Name.toLowerCase() === userName);
    if (userDtls.length > 0) {
      return { userName: userDtls[0].Name, ward: userDtls[0].ward };
    } else {
      return "";
    }
  };
  const handleLogin = () => {
    const userData = checkUser(inputUser);
    if (userData !== "") {
      dispatch(loginUser(userData.userName, userData.ward));
      history.push({
        pathname: "/voters",
      });
    } else {
      setLoginErr(true);
    }
  };
  const handleValueChange = (e) => {
    if (loginErr) {
      setLoginErr(false);
    }
    setInputUser(e.target.value);
  };
  return (
    <div style={{ margin: "20px" }}>
      {loading && <p style={{ color: "blue" }}>Loading...Please wait</p>}
      {loginErr && <p style={{ color: "red" }}>Invalid Login user</p>}
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Login Name"
          vaue={inputUser}
          onChange={handleValueChange}
          name="inputUser"
        />
      </div>
      <Button
        variant="primary"
        onClick={handleLogin}
        size="sm"
        style={{ width: "220px" }}
      >
        Login
      </Button>
    </div>
  );
}

export default connect()(Login);
