import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { fetchRecipes } from "../store/recipe";

export class Recipes extends React.Component {
  componentDidMount() {
      let ingredients = this.props.ingredients
      if(ingredients !== undefined) {
        this.props.fetchRecipes(ingredients)
      }
    //   console.log(this.props)
  }
  mealTime() {
    let currentDate = new Date();
    let time = currentDate.getHours();
    if (time >= 4 && time <= 11) {
      return "breakfast";
    } else if (time >= 12 && time <= 16) {
      return "lunch";
    } else {
      return "dinner";
    }
  }
  render() {
    return (
      <div>
        <h1>What's for {this.mealTime()}?</h1>
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
    recipes: state.recipe.recipes
  };
};

const mapDispatch = (dispatch) => ({
    fetchRecipes: (ingredients) => dispatch(fetchRecipes(ingredients)),
});

export default connect(mapState, mapDispatch)(Recipes);