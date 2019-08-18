export const RECEIVE_POKEMON = 'RECEIVE_POKEMON';

export const RECEIVE_POKEMONS = 'RECEIVE_POKEMONS';

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

export default (state = defaultState, action) => {
  switch(action.type) {
    case RECEIVE_POKEMONS:
      return { ...addItems(state, action.payload), isFetching: false }
    case RECEIVE_POKEMON:
      return { ...add(state, action.payload), isFetching: false }
    default:
      return state;
  }
};
