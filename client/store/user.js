import axios from "axios";
import history from "../history";
import {push} from 'connected-react-router'

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */

export const auth = (email, password, method, name) => async (dispatch) => {
  let res;
  try {
    if (name) {
      res = await axios.post(`/api`, {
        query: `mutation {addUser(email: "${email}", name: "${name}", password: "${password}"), {id, name, email}}`,
      });
    } else {
      res = await axios.post(`/api`, {
        query: `mutation {addUser(email: "${email}", password: "${password}"), {id, name, email}}`,
      });
    }
    dispatch(getUser(res.data.data.addUser))
    dispatch(push('/home'))
    // NEED TO ADD ERROR HANDLING
    console.log(res);
  } catch (authError) {
    // console.log(authError)
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data.data.addUser));
    history.push("/home");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const me = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api`, {
      query: `{user(id: ${id}), {id, name, email}}`,
    });
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

//work on logout with graphql
export const logout = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      console.log("*************",action.user)
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
