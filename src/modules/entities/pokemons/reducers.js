import {
  fetchRequest,
  receiveRequest
} from 'modules/common/request';

export const RECEIVE_POKEMON = 'RECEIVE_POKEMON';

export const REMOVE_POKEMON = 'REMOVE_POKEMON';

export const RECEIVE_POKEMONS = 'RECEIVE_POKEMONS';

export const POKEMON_FETCH_REQUEST = 'POKEMON_FETCH_REQUEST';

export const POKEMON_RECEIVE_REQUEST = 'POKEMON_RECEIVE_REQUEST';

const defaultState = {
  byId: {},
  all: [],
  isFetching: false
};

const addItems = (state, items) => {
  let newState = state
  for(let [id, item] of Object.entries(items)) {
    newState = add(newState, { [id]: item })
  }
  return newState;
}

const add = (state, item) => ({
  ...state,
  byId: {
    ...state.byId,
    ...item
  },
  all: [
    ...new Set(state.all.concat(Object.keys(item)))
  ]
});

const deleteItem = (state, id) => {
  const all = state.all.filter((item) => {
    return(item !== id)
  });
  
  const byId = {};

  Object.values(state.byId).forEach((item) => {
    if (item.id !== id) {
      byId[item.id] = item;
    }
  });

  return({
    ...state,
    byId,
    all,
  })
};

export default (state = defaultState, action) => { 
  switch(action.type) {
    case REMOVE_POKEMON:
      return { ...deleteItem(state, action.payload), isFetching: false }
    case RECEIVE_POKEMONS:
      return { ...addItems(state, action.payload), isFetching: false }
    case RECEIVE_POKEMON:
      return { ...add(state, action.payload), isFetching: false }
    case POKEMON_FETCH_REQUEST:
      return fetchRequest(state);
    case POKEMON_RECEIVE_REQUEST:
      return receiveRequest(state);
    default:
      return state;
  }
};
