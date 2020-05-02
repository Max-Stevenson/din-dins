import React from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import "./UserProfileItem.css";

const UserProfileItem = props => {
  return (
    <div className="centered">
      <h1>{props.name}'s Profile</h1>
      <form className="login-form">
        <div className="form-field">
          <label for="usrname">Username</label>
          <FaUserAlt />
          <input type="text" id="usrname" name="usrname" required={true} />
        </div>
        <div className="form-field">
          <label for="psw">Password</label>
          <FaLock />
          <input type="password" id="psw" name="psw" required={true} />
        </div>
        <div className="form-field">
          <label for="confirmPsw">Confirm Password</label>
          <FaLock />
          <input
            type="password"
            id="confirmPsw"
            name="confirmPsw"
            required={true}
          />
        </div>
        <a className="btn-cancel" href="/">Cancel</a>
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UserProfileItem;
