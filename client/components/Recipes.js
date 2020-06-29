import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
/**
 * COMPONENT
 */

export class Recipes extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>What's for dinner?</h1>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    id: state.user.id,
    email: state.user.email,
    name: state.user.name,
    ingredients: state.ingredient.ingredients,
  };
};

const mapDispatch = (dispatch) => ({});