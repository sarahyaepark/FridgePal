import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { fetchRecipes } from "../store/recipe";

let ingredientsCompare = [];
export class Recipes extends React.Component {
  componentDidMount() {
    let ingredients = this.props.ingredients;
    // if ingredients length when component mounts
    // is greater than ingredients length before the component mounts
    // then call fetch recipes
    // else do nothing

    // make the actual ingredient names match now
    console.log(ingredients);
    let idx1 = 0;
    if (ingredients !== undefined) {
      let ingredientsCompare2 = ingredients;
      while (ingredientsCompare[idx1] !== undefined) {
        if (ingredientsCompare[idx1] === ingredientsCompare2[idx1]) {
          idx1++;
        } else {
          this.props.fetchRecipes(ingredients);
          break
        }
      }
      ingredientsCompare = ingredientsCompare2;
      // if (ingredientsLen2 > ingredientsLen) {
      //   this.props.fetchRecipes(ingredients);
      // }
    }
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
    console.log("rendering recipes...", this.props);
    let recipes = this.props.recipes;
    return (
      <div className="recipesPage">
        <h1>What's for {this.mealTime()}?</h1>
        <div className="recipesContainer">
          {recipes !== undefined ? (
            recipes.map((recipe) => {
              return (
                <div className="recipe" key={recipe.id}>
                  <a href={recipe.sourceUrl}>
                    <img id="recipeImg" src={recipe.imgUrl} />
                  </a>
                  <h3>{recipe.title}</h3>
                  <h3>Uses:</h3>
                  {recipe.usedIngredients.map((ingredient) => {
                    return <li key={ingredient.id}>{ingredient.name}</li>;
                  })}
                </div>
              );
            })
          ) : (
            <img
              src="https://i.pinimg.com/originals/ee/1d/08/ee1d081c5bdf966b058c1a6588e73e8a.gif"
              alt="loading..."
              id="loadingImg"
            />
          )}
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
    recipes: state.recipe.recipes,
  };
};

const mapDispatch = (dispatch) => ({
  fetchRecipes: (ingredients) => dispatch(fetchRecipes(ingredients)),
});

export default connect(mapState, mapDispatch)(Recipes);
