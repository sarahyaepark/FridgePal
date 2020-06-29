import axios from "axios";
import history from "../history";
import { push } from "connected-react-router";
const Spoonacular_API_KEY = require("../../secrets");

/**
 * ACTION TYPES
 */
const GET_RECIPES = "GET_RECIPES";

const getRecipes = (recipes) => ({
  type: GET_RECIPES,
  recipes,
});

export const fetchRecipes = (ingredients) => async (dispatch) => {
  let names = ingredients.map((ingredient) => {
    return ingredient.name;
  });
  console.log(names);
  let strIngredients = names.join(",");
  console.log(strIngredients);
  try {
    let { data } = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${Spoonacular_API_KEY}&ingredients=${strIngredients}`
    );
    console.log("SPOONACULAR>>> initial return", data);
    let links = data.map(async (recipe) => {
      let link = await axios.get(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${Spoonacular_API_KEY}`
      );
      return link;
    });
    let urls = await Promise.all(links);
    let sourceUrls = urls.map((url) => {
      return url.data.sourceUrl;
    });
    // create array of objects omg this thunk is getting so long
    let recipeInfo = data.map((recipe) => {
      let tempRecipe = {
        id: recipe.id,
        imgUrl: recipe.image,
        title: recipe.title,
        usedIngredients: recipe.usedIngredients,
      };
      return tempRecipe;
    });
    // add source url to each object in recipeInfo
    for (let i = 0; i < recipeInfo.length; i++) {
      recipeInfo[i].sourceUrl = sourceUrls[i];
    }
    console.log("SPOONACULAR>>>>>>> source links return", recipeInfo);
    // want to dispatch an object with the image, title, usedIngredients, sourceUrls
    dispatch(getRecipes(recipeInfo));
  } catch (authError) {
    return dispatch(getRecipes({ error: authError }));
  }
};

let defaultState = {};
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return { ...defaultState, recipes: action.recipes };
    default:
      return state;
  }
}
