import React from "react";
import { connect } from "react-redux";
import { AddIngredient } from "./AddIngredient";
import {
  fetchIngredients,
  newIngredient,
  deleteIngredient,
} from "../store/ingredient";


export class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchIngredients(parseInt(this.props.id));
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let userId = this.props.id;
    let name = event.target.ingredientName.value;
    this.props.newIngredient(userId, name);
    this.props.fetchIngredients(userId);
    this.props.fetchIngredients(userId);
  }
  handleDelete(id) {
    console.log("deleting ", id);
    let userId = this.props.id;
    this.props.deleteIngredient(id)
    this.props.fetchIngredients(userId);
  }
  render() {
    let { ingredients } = this.props;
    console.log("rendering...", this.props);
    return (
      <div className="ingredientsContainer">
        <h3 id="welcome">Welcome, {this.props.name}</h3>
        <AddIngredient handleSubmit={this.handleSubmit} />
        <br />
        <div className="singlesContainer">
          {ingredients !== undefined
            ? ingredients.map((ingredient) => {
                return (
                  <div
                    className="singleIngredient"
                    key={ingredient.id}
                    onClick={() => this.handleDelete(ingredient.id)}
                  >
                    <p>{ingredient.name}</p>
                  </div>
                );
              })
            : null}
        </div>
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

const mapDispatch = (dispatch) => ({
  fetchIngredients: (id) => dispatch(fetchIngredients(id)),
  newIngredient: (userId, name, quantity) =>
    dispatch(newIngredient(userId, name, quantity)),
  deleteIngredient: (id) => dispatch(deleteIngredient(id)),
});

export default connect(mapState, mapDispatch)(UserHome);
