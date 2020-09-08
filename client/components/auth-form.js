import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//apollo client set up
// making the gql call

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div className="authForm">
      <br />
      <br />
      {name === "signup" ? <h1>Sign Up</h1> : <h1>Log In</h1>}
      <div>
        <Form onSubmit={handleSubmit} name={name} className="form">
          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              placeholder="awesome@email.com"
              required
              className="formGrid"
            />
          </Form.Group>
          {/* <br /> */}
          {displayName !== "Login" ? (
            <Form.Group controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="userName"
                placeholder="Sarah"
                className="formGrid"
                required
              />
            </Form.Group>
          ) : null}
          <br />
          <Form.Group controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="superSecretPass2"
              required
              className="formGrid"
            />
          </Form.Group>
          <br />
          <Button id="submitButton" type="submit">
            {displayName}
          </Button>
          {props.user !== undefined ? (
            props.user.id === null ? (
              <p>Incorrect email or password</p>
            ) : null
          ) : null}
        </Form>
      </div>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error,
    user: state.user,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      if (evt.target.userName) {
        const userName = evt.target.userName.value;
        dispatch(auth(email, password, formName, userName));
      } else {
        dispatch(auth(email, password, formName));
      }
    },
  };
};

// export default graphql(postUser)(Authform)

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
