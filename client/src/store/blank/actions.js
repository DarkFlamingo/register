import { createAction } from '@reduxjs/toolkit';
import { blank as blankService } from 'src/services/services';

const ActionType = {
  SET_VALID_BLANK: 'blank/set-valid-blank',
  SET_BLANKS: 'blanks/set-blanks'
};

const setValidBlank = createAction(ActionType.SET_VALID_BLANK, blank => ({
  payload: {
    blank
  }
}));

const setBlanks = createAction(ActionType.SET_BLANKS, blanks => ({
  payload: {
    blanks
  }
}));

const checkBlank = data => async dispatch => {
  const result = await blankService.checkBlank(data);
  if (result.isExist) {
    dispatch(setValidBlank(result.blank));
  } else {
    dispatch(setValidBlank(null));
  }
};

const loadAllBlanks = () => async dispatch => {
  const blanks = await blankService.getAllBlanks();

  dispatch(setBlanks(blanks));
};

export { setValidBlank, setBlanks, checkBlank, loadAllBlanks };
