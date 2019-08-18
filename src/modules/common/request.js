export const fetchRequest = (state) => ({
  ...state,
  isFetching: true
});

export const receiveRequest = (state) => ({
  ...state,
  isFetching: false
});
