import { createReducer } from '@reduxjs/toolkit';
import { setValidBlank, setBlanks } from './actions';

const initialState = {
  validBlank: false,
  blank: []
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(setValidBlank, (state, action) => {
    const { blank } = action.payload;

    state.validBlank = blank;
  });
  builder.addCase(setBlanks, (state, action) => {
    const { blanks } = action.payload;

    state.blanks = blanks;
  });
});

export { reducer };
