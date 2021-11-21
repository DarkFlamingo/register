import { createReducer } from '@reduxjs/toolkit';
import { setValidBlank } from './actions';

const initialState = {
  validBlank: false
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(setValidBlank, (state, action) => {
    const { blank } = action.payload;

    state.validBlank = blank;
  });
});

export { reducer };
