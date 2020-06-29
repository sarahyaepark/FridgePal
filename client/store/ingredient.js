import axios from "axios";
import history from "../history";
import { push } from "connected-react-router";

/**
 * ACTION TYPES
 */
const GET_INGREDIENTS = "GET_INGREDIENTS";
const ADD_INGREDIENT = "ADD_INGREDIENT";
const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

/**
 * ACTION CREATORS
 */
const getIngredients = (ingredients) => ({
  type: GET_INGREDIENTS,
  ingredients,
});
const addIngredients = (ingredient) => ({ type: ADD_INGREDIENT, ingredient });
const removeIngredient = (id) => ({ type: REMOVE_INGREDIENT, id });

/**
 * THUNK CREATORS
 */

export const fetchIngredients = (id) => async (dispatch) => {
  try {
    let { data } = await axios.post(`/api`, {
      query: `{user(id:${id}){ingredients{name, id}}}`,
    });
    let ingredients = data.data.user.ingredients;
    dispatch(getIngredients(ingredients));
    // NEED TO ADD ERROR HANDLING
  } catch (authError) {
    // console.log(authError)
    return dispatch(getIngredients({ error: authError }));
  }
};

export const newIngredient = (userId, name, quantity) => async (dispatch) => {
  try {
    let {data} = await axios.post(`/api`, {
      query: `mutation{addIngredient(userId:${userId}, name:"${name}"){name, id}}`,
    });
    console.log(">>>>******>>>>>>>", data);
  } catch (authError) {
    // console.log(authError)
    return dispatch(getIngredients({ error: authError }));
  }
};

export const deleteIngredient = (id) => async (dispatch) => {
  try {
    await axios.post(`/api`, {
      query: `mutation{deleteIngredient(id:${id}){name}}`
    })
    // dispatch(removeIngredient(id))
  } catch(authError) {
    return dispatch(getIngredients({ error: authError }));
  }
}

/**
 * REDUCER
 */
let defaultState = {};
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_INGREDIENTS:
      return { ...defaultState, ingredients: action.ingredients };
    case ADD_INGREDIENT:
      return { ...defaultState, ingredients: [...defaultState, action.ingredient] };
    case REMOVE_INGREDIENT:
      console.log(defaultState)
      if (defaultState.ingredient.ingredients.find(item => item.id === action.id)) {
        return [...defaultState.ingredient.ingredients.filter(item => item.id !== action.id)]
      } else {
        return defaultState
      }
    default:
      return state;
  }
}
