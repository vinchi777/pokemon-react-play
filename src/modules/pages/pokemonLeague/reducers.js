 export const SET_PREVIEW = 'SET_PREVIEW';

const defaultState = {
  currentPreview: null,
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case SET_PREVIEW:
      return {
        ...state,
        currentPreview: action.payload,
      };
    default:
      return state;
  }

}
