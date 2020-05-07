import React from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import "./UserProfileItem.css";
import Button from "../../shared/components/FormElements/Button";

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
        <Button to="/">Cancel</Button>
        <Button type="submit" value="update">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfileItem;
