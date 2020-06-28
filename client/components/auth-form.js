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
    <div>
      <h2>Email</h2>
      <Form onSubmit={handleSubmit} name={name}>
        <Form.Group controlId="formGridAddress1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            // value={this.state.email}
            placeholder="awesome@email.com"
            // onChange={this.handleChange}
            required
          />
        </Form.Group>
        <br />
        {displayName !== "Login" ? (
          <Form.Group controlId="formGridAddress2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="userName"
              // value={this.state.userName}
              // onChange={this.handleChange}
              placeholder="Sarah"
            />
          </Form.Group>
        ) : null}
        <br />
        <Form.Group controlId="formGridCity">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            // value={this.state.password}
            placeholder="superSecretPass2"
            // onChange={this.handleChange}
            required
          />
        </Form.Group>
        <Button id="tealButton" type="submit">
          {displayName}
        </Button>
      </Form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error,
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

// <div>
//   <form onSubmit={handleSubmit} name={name}>
//     <div>
//       <label htmlFor="email">
//         <small>Email</small>
//       </label>
//       <input name="email" type="text" />
//     </div>
//     <div>
//       <label htmlFor="password">
//         <small>Password</small>
//       </label>
//       <input name="password" type="password" />
//     </div>
//     <div>
//       <button type="submit">{displayName}</button>
//     </div>
//     {error && error.response && <div> {error.response.data} </div>}
//   </form>
//   <a href="/auth/google">{displayName} with Google</a>
// </div>
// class AuthForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = this.initialState();
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   initialState() {
//     return {
//       email: "",
//       name: "",
//       password: "",
//     };
//   }

//   handleChange(event) {
//     this.setState({ [event.target.name]: event.target.value });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const email = this.state.email;
//     const name = this.state.name;
//     const password = this.state.password;
//   }

//   render() {
//     return (
//       <div>
//         <h2>Email</h2>
//         <Form onSubmit={this.handleSubmit}>
//           <Form.Group controlId="formGridAddress1">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               name="email"
//               value={this.state.email}
//               placeholder="awesomeGirl@email.com"
//               onChange={this.handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formGridAddress2">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               name="name"
//               value={this.state.name}
//               onChange={this.handleChange}
//               placeholder="Sarah"
//             />
//           </Form.Group>
//           <Form.Group controlId="formGridCity">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               name="password"
//               value={this.state.password}
//               placeholder="superSecretPass2"
//               onChange={this.handleChange}
//               required
//             />
//           </Form.Group>
//           <Button id="tealButton" type="submit" onSubmit={this.handleSubmit}>
//             Submit
//           </Button>
//         </Form>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   attemptUpdateUser: userDetails => dispatch(attemptUpdateUser(userDetails))
// })

// export default connect(null, mapDispatchToProps)(AddressForm)

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
