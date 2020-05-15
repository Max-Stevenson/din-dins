import React, { useContext } from "react";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false }
    },
    false
  );

  const authSubmitHandler = async event => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        })
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }

    auth.login();
  };

  return (
    <Card class="authentication">
      <h2>Login Required</h2>
      <form>
        <Input
          element="input"
          id="email"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your password."
          onInput={inputHandler}
        />
        <Button
          type="submit"
          onClick={authSubmitHandler}
          disabled={!formState.isValid}
        >
          Login
        </Button>
      </form>
    </Card>
  );
};

export default Auth;