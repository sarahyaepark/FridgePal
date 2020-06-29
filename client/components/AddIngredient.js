import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";

export const AddIngredient = (props) => {
    const {handleSubmit} = props
  return (
    <div>
      <h3>What's in your fridge?</h3>
      <Form onSubmit ={handleSubmit}>
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
};