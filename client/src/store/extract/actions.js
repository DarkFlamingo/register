import { createAction } from '@reduxjs/toolkit';

const ActionType = {
  SET_EXTRACT: 'extract/set-extract'
};

const setExtract = createAction(ActionType.SET_EXTRACT, extract => ({
  payload: {
    extract
  }
}));

export { setExtract };
