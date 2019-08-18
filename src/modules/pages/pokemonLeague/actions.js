import {SET_PREVIEW} from './reducers';
import { setItems } from 'modules/common/actionHelpers';

const preview = (id) => (dispatch) => {
  dispatch(setItems(SET_PREVIEW, id));
}

export default {
  preview
}
