import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase/firebase";
import "./Login.css";
import { actionTypes } from "../stateProvider/reducer";
import { useStateValue } from "../stateProvider/StateProvider";

export const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/WhatsApp_logo-color-vertical.svg/600px-WhatsApp_logo-color-vertical.svg.png"
          alt="logo"
        />
        <div className="login__text">
          <h1> Sign In to WhatsApp </h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};
