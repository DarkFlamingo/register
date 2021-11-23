/* eslint-disable */
import { createReducer } from '@reduxjs/toolkit';
import {
  setRegistrars,
  loadRegistrars,
  blockRegistrar,
  unblockRegistrar,
  addRegistrar,
  loadUsers,
  deleteUser
} from './actions';

const initialState = {
  registrars: [],
  users: []
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(setRegistrars, (state, action) => {
    const { registrars } = action.payload;

    state.registrars = registrars;
  });
  builder.addCase(deleteUser, (state, action) => {
    const { id } = action.payload;
    console.log('here');
    state.users = state.users.filter(user => user.id !== id);
  });
  builder.addCase(addRegistrar, (state, action) => {
    const { registrar } = action.payload;

    state.registrars = [...state.registrars, registrar];
  });
  builder.addCase(loadRegistrars.fulfilled, (state, { payload }) => {
    const { registrars } = payload.data;

    state.registrars = registrars;
  });
  builder.addCase(blockRegistrar.fulfilled, (state, { payload }) => {
    const { registrar } = payload.data;

    state.registrars = state.registrars.map(item =>
      item.id === registrar.id ? registrar : item
    );
  });
  builder.addCase(unblockRegistrar.fulfilled, (state, { payload }) => {
    const { registrar } = payload.data;

    state.registrars = state.registrars.map(item =>
      item.id === registrar.id ? registrar : item
    );
  });
  builder.addCase(loadUsers.fulfilled, (state, { payload }) => {
    const { users } = payload.data;

    state.users = users;
  });
});

export { reducer };
