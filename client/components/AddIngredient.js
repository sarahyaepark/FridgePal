import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";

export const AddIngredient = (props) => {
  const { handleSubmit } = props;
  return (
    <div className="addIngredient">
      <h2 id="addTitle">What's in your fridge?</h2>
      <Form onSubmit={handleSubmit} className="addForm">
        <Form.Group controlId="formInput">
          <Form.Label>Ingredient</Form.Label>
          <Form.Control
            type="text"
            name="ingredientName"
            placeholder="Tomato..."
            className="addGrid"
          />
        </Form.Group>
        <Button id="addButton" size="lg" type="submit">
          Add Ingredient
        </Button>
      </Form>
    </div>
  );
};
