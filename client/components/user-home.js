import React from "react";
import { connect } from "react-redux";
import { AddIngredient } from "./AddIngredient";
import { fetchIngredients, newIngredient } from "../store/ingredient";
/**
 * COMPONENT
 */

export class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchIngredients(this.props.id)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    let userId = this.props.id
    let name = event.target.ingredientName.value
    this.props.newIngredient(userId, name)
    this.props.fetchIngredients(userId)
  }
  render() {
    let {ingredients} = this.props
    console.log('rendering...', this.props.ingredients)
    return (
      <div>
        <h3>Welcome, {this.props.name}</h3>
        <AddIngredient handleSubmit={this.handleSubmit}/>
        <div>
          {ingredients !== undefined
            ? ingredients.map(ingredient => {
              return (<li key={ingredient.id}>{ingredient.name}</li>)
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
  newIngredient: (userId, name, quantity) => dispatch(newIngredient(userId, name, quantity))
});

export default connect(mapState, mapDispatch)(UserHome);

