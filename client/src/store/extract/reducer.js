import { createReducer } from '@reduxjs/toolkit';
import { setExtract } from './actions';

const initialState = {
  extract: null
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(setExtract, (state, action) => {
    const { extract } = action.payload;

    state.extract = extract;
  });
});

export { reducer };
