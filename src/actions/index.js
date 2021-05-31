import axios from 'axios';

export const FETCHING_SMURF = 'FETCHING_SMURF';
export const FETCHING_SMURF_SUCCESS = 'FETCHING_SMURF_SUCCESS';
export const FETCHING_SMURF_FAILURE = 'FETCHING_SMURF_FAILURE';
export const ADD_SMURF = 'ADD_SMURF';
export const ERROR = 'ERROR';

export const fetchSmurfs = () => (dispatch) => {
  dispatch({ type: FETCHING_SMURF });

  axios
    .get('http://localhost:3333/smurfs')
    .then((res) => {
      console.log(res);
      dispatch({ type: FETCHING_SMURF_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: FETCHING_SMURF_FAILURE, payload: JSON.stringify(err) });
    });
};

export const addSmurf = (newSmurf) => (dispatch) => {
  axios
    .post('http://localhost:3333/smurfs', newSmurf)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: ADD_SMURF, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: FETCHING_SMURF_FAILURE });
    });
};

export const setError = () => (dispatch) => {
  dispatch({
    type: ERROR,
    payload: 'Name, position and nickname fields are required.',
  });
};

//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retreive smurfs from our server, saves the result of that call to our state and shows an error if one is made.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary)
//3. Add a standard action that allows us to set the value of the error message slice of state.
