import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { fetchIngredients } from "../store/ingredient";

export class AddIngredient extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  handleSubmit(event) {
    event.preventDefault();
    let ingredientName = event.target.ingredientName.value;
    let id = this.props.id;
    // call thunk
  }
  render() {
    return (
      <div>
        <h3>What's in your fridge?</h3>
        <Form>
          <Form.Group controlId="formInput">
            <Form.Label>Ingredient</Form.Label>
            <Form.Control
              type="text"
              name="ingredientName"
              placeholder="Tomato..."
            />
          </Form.Group>
          <Button id="tealButton" size="lg" type="submit">
            Add Ingredient
          </Button>
        </Form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    id: state.user.id,
  };
};

export default connect(mapState)(AddIngredient);
