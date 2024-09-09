import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postLogin } from "../../services/apiServices";

const Register = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle click login after fill on the blank.
  const handleLogin = async () => {
    // validate data from form

    // submit data
    let data = await postLogin(email.trim(), password.trim());
    if (data && data.EC === 0) {
      navigate("/");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleSignIn = () => {
    navigate("/Login");
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Have an account yet ?</span>
        <button className="btn-signup" onClick={() => handleSignIn()}>
          Sign in
        </button>
      </div>
      <div className="title col-4 mx-auto">Create New Account</div>
      <div className="welcome col-4 mx-auto">
        By having an account, you can access all my app's services.
      </div>
      <div className="content-form col-4 mx-auto">
        {/* User Name */}
        <div className="form-group">
          <label>User Name</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Register
          </button>
        </div>
        <div className="back btn">
          <span
            onClick={() => {
              navigate("/");
            }}
          >
            &#60;&#60; back to home
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
