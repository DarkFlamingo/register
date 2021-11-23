import { createReducer } from '@reduxjs/toolkit';
import { setRegistrars, loadRegistrars, blockRegistrar, unblockRegistrar } from './actions';

const initialState = {
  registrars: []
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(setRegistrars, (state, action) => {
    const { registrars } = action.payload;

    state.registrars = registrars;
  });
  builder.addCase(loadRegistrars.fulfilled, (state, { payload }) => {
    const { registrars } = payload.data;

    state.registrars = registrars;
  });
  builder.addCase(blockRegistrar.fulfilled, (state, { payload }) => {
    const { registrar } = payload.data;

    state.registrars = state.registrars.map(item => ((item.id === registrar.id) ? registrar : item));
  });
  builder.addCase(unblockRegistrar.fulfilled, (state, { payload }) => {
    const { registrar } = payload.data;

    state.registrars = state.registrars.map(item => ((item.id === registrar.id) ? registrar : item));
  });
});

export { reducer };
