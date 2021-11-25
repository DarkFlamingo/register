import { createReducer } from '@reduxjs/toolkit';
import { setLogs } from './actions';

const initialState = {
  logs: []
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(setLogs, (state, action) => {
    const { logs } = action.payload;

    state.logs = logs;
  });
});

export { reducer };
