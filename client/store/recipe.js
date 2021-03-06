import axios from "axios";
import history from "../history";
import { push } from "connected-react-router";
const Spoonacular_API_KEY =
  process.env.SPOONACULAR_API_KEY || require("../../secrets");

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
  let strIngredients = names.join(",");
  try {
    let { data } = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${Spoonacular_API_KEY}&ingredients=${strIngredients}`
    );
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
    let recipeInfo = data.map((recipe) => {
      let tempRecipe = {
        id: recipe.id,
        imgUrl: recipe.image,
        title: recipe.title,
        usedIngredients: recipe.usedIngredients,
      };
      return tempRecipe;
    });
    for (let i = 0; i < recipeInfo.length; i++) {
      recipeInfo[i].sourceUrl = sourceUrls[i];
    }
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
