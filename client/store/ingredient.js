import axios from "axios";
import history from "../history";
import {push} from 'connected-react-router'

/**
 * ACTION TYPES
 */
const GET_INGREDIENTS = "GET_INGREDIENTS";
const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

/**
 * ACTION CREATORS
 */
const getIngredients = (ingredients) => ({ type: GET_INGREDIENTS, ingredients });
const removeIngredient = () => ({ type: REMOVE_INGREDIENT });

/**
 * THUNK CREATORS
 */

export const fetchIngredients = (id) => async (dispatch) => {
  let res;
  try {
      res = await axios.post(`/api`, {
        query: `{user(id:${id}){ingredients{name}}}`,
      });
    console.log('>>>>>>>>>>>',res)
    // dispatch(getIngredients())
    // dispatch(push('/home'))
    // NEED TO ADD ERROR HANDLING
    console.log(res);
  } catch (authError) {
    // console.log(authError)
    return dispatch(getIngredients({ error: authError }));
  }

//   try {
//     dispatch(getIngredients(res.data.data.addUser));
//     history.push("/home");
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr);
//   }
};

/**
 * REDUCER
 */
let defaultState = {}
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_INGREDIENTS:
      return action.ingredients;
    case REMOVE_INGREDIENT:
      return defaultState;
    default:
      return state;
  }
}
