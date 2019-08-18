import axios from  'axios';
import Config from '../../../config';
import {RECEIVE_POKEMON} from './reducers';

const setItem = (item) => ({
  type: RECEIVE_POKEMON,
  payload: item,
})

const index = () => (dispatch) => {
  return axios.get(`${Config.POKEMON_API_URL}/pokemon`)
    .then((data) => {
      console.log(data);
    });
};

const search = (name) => (dispatch) => {
  return axios.get(`${Config.POKEMON_API_URL}/pokemon/${name}`)
    .then((response) => {
      const formatted = {};
      formatted[response.data.id] = response.data
      dispatch(setItem(formatted));
      return response.data
    });
};

export default {
  index,
  search,
  setItem
};
