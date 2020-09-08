import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { AddIngredient } from "./AddIngredient";
import {
  fetchIngredients,
  newIngredient,
  deleteIngredient,
} from "../store/ingredient";

export const UserHome = (props) => {
  // let [currentIngredients, updateIngredients] = useState(0)
  useEffect(() => {
    props.fetchIngredients(parseInt(props.id))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    let userId = props.id;
    let name = event.target.ingredientName.value;
    props.newIngredient(userId, name);
    props.fetchIngredients(parseInt(userId))
    props.fetchIngredients(parseInt(userId))
  }
  const handleDelete = (id) => {
    let userId = props.id;
    props.deleteIngredient(id)
    // updateIngredients(currentIngredients = props.ingredients)
    props.fetchIngredients(parseInt(userId))
    props.fetchIngredients(parseInt(userId))
  }
  let { ingredients } = props;
  return (
    <div className="ingredientsContainer">
      {/* {updateIngredients(currentIngredients = props.ingredients)} */}
        <h3 id="welcome">Welcome, {props.name}</h3>
        <AddIngredient handleSubmit={handleSubmit} />
        <br />
        <div className="singlesContainer">
          {ingredients !== undefined
            ? ingredients.map((ingredient) => {
                return (
                  <div
                    className="singleIngredient"
                    key={ingredient.id}
                    onClick={() => handleDelete(ingredient.id)}
                  >
                    <p>{ingredient.name}</p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
  )
}

const mapState = (state) => {
  return {
    id: state.user.id,
    email: state.user.email,
    name: state.user.name,
    ingredients: state.ingredient.ingredients,
  };
};

const mapDispatch = (dispatch) => ({
  fetchIngredients: (id) => dispatch(fetchIngredients(id)),
  newIngredient: (userId, name, quantity) =>
    dispatch(newIngredient(userId, name, quantity)),
  deleteIngredient: (id) => dispatch(deleteIngredient(id)),
});

export default connect(mapState, mapDispatch)(UserHome);
