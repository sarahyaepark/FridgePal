import React, { useEffect } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { fetchRecipes } from "../store/recipe";

export const Recipes = (props) => {
  let recipes = props.recipes;
  const compareIngredients = () => {
    let comparison = [];
    for (let i = 0; i < props.ingredients.length; i++) {
      comparison.push(props.ingredients[i].name);
    }
    return comparison;
  };
  const compareArrays = (currentArr, originalIngredients) => {
    if (!Array.isArray(currentArr)) return false
    if (currentArr.length !== originalIngredients.length) return false;
    for (let i = 0; i < currentArr.length; i++) {
      if (currentArr[i] !== originalIngredients[i]) return false;
    }
    return true;
  };
  useEffect(() => {
    let currentIngredients = sessionStorage.getItem("currentIngredients");
    let currentArr
    if (currentIngredients !== null) {
      currentArr = currentIngredients.split(",");
    }
    let originalIngredients = compareIngredients();
    let sameArrays = compareArrays(currentArr, originalIngredients);
    if (!sameArrays) {
      console.log("FETCHING RECIPES", props.ingredients);
      props.fetchRecipes(props.ingredients)
      let newIngredients = compareIngredients();
      sessionStorage.setItem("currentIngredients", newIngredients);
    } else {
      console.log("states were the same");
    }
  }, []);

  const mealTime = () => {
    let currentDate = new Date();
    let time = currentDate.getHours();
    if (time >= 4 && time <= 11) {
      return "breakfast";
    } else if (time >= 12 && time <= 16) {
      return "lunch";
    } else {
      return "dinner";
    }
  };
  return (
    <div className="recipesPage">
      <h1>What's for {mealTime()}?</h1>
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
};

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
