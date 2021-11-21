import { createAction } from '@reduxjs/toolkit';
import { blank as blankService } from 'src/services/services';

const ActionType = {
  SET_VALID_BLANK: 'blank/set-valid-blank'
};

const setValidBlank = createAction(ActionType.SET_VALID_BLANK, blank => ({
  payload: {
    blank
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

export { setValidBlank, checkBlank };
