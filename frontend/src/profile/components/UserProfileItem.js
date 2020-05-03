import React from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import "./UserProfileItem.css";

const UserProfileItem = props => {
  return (
    <div className="centered">
      <h1>{props.name}'s Profile</h1>
      <form className="login-form">
        <div className="form-field">
          <label htmlFor="usrname">Username</label>
          <FaUserAlt />
          <input type="text" id="usrname" name="usrname" required={true} />
        </div>
        <div className="form-field">
          <label htmlFor="psw">Password</label>
          <FaLock />
          <input type="password" id="psw" name="psw" required={true} />
        </div>
        <div className="form-field">
          <label htmlFor="confirmPsw">Confirm Password</label>
          <FaLock />
          <input
            type="password"
            id="confirmPsw"
            name="confirmPsw"
            required={true}
          />
        </div>
        <a className="form-btn" href="/">Cancel</a>
        <input className="form-btn" type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UserProfileItem;
