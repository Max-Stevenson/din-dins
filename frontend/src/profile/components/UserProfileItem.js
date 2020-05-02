import React from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";

const UserProfileItem = props => {
  return (
    <div className="centered">
      <h1>{props.name}'s Profile</h1>
      <form className="login-form">
        <div className="form-field">
          <FaUserAlt />
          <label for="usrname">Username</label>
          <input type="text" id="usrname" name="usrname" required={true} />
        </div>
        <div className="form-field">
          <FaLock />
          <label for="psw">Password</label>
          <input type="password" id="psw" name="psw" required={true} />
        </div>
        <div className="form-field">
          <FaLock />
          <label for="confirmPsw">Confirm Password</label>
          <input
            type="password"
            id="confirmPsw"
            name="confirmPsw"
            required={true}
          />
        </div>
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UserProfileItem;
