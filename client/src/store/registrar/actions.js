import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { registrar as registrarService } from 'src/services/services';

const ActionType = {
  SET_REGISTRARS: 'registrars/set-registrars',
  LOAD_REGISTRARS: 'registrars/load',
  BLOCKED_REGISTRARS: 'registrars/block',
  UNBLOCKED_REGISTRARS: 'registrars/unblock',
  MAKE_REGISTRAR: 'registrars/make-registrar',
  LOAD_USERS: 'users/load-users',
  DELETE_USER: 'users/delete-user',
  ADD_REGISTRAR: 'registrars/add-registrar'
};

const setRegistrars = createAction(ActionType.SET_REGISTRARS, registrars => ({
  payload: {
    registrars
  }
}));

const deleteUser = createAction(ActionType.DELETE_USER, id => ({
  payload: {
    id
  }
}));

const loadRegistrars = createAsyncThunk(
  ActionType.LOAD_REGISTRARS,
  async () => {
    const registrars = await registrarService.loadRegistrars();
    return {
      data: {
        registrars
      }
    };
  }
);

const blockRegistrar = createAsyncThunk(
  ActionType.BLOCKED_REGISTRARS,
  async id => {
    const registrar = await registrarService.blockRegistrar(id);
    return {
      data: {
        registrar
      }
    };
  }
);

const unblockRegistrar = createAsyncThunk(
  ActionType.UNBLOCKED_REGISTRARS,
  async id => {
    const registrar = await registrarService.unblockRegistrar(id);
    return {
      data: {
        registrar
      }
    };
  }
);

const addRegistrar = createAction(ActionType.ADD_REGISTRAR, registrar => ({
  payload: {
    registrar
  }
}));

const makeRegistrar = ({ id, data }) => async dispatch => {
  const user = await registrarService.makeRegistrar(id, data);
  if (user) {
    dispatch(deleteUser(user.id));
    dispatch(addRegistrar(user));
  }
  return {
    data: {
      user
    }
  };
};

const loadUsers = createAsyncThunk(ActionType.LOAD_USERS, async () => {
  const users = await registrarService.loadUsers();
  return {
    data: {
      users
    }
  };
});

export {
  setRegistrars,
  loadRegistrars,
  blockRegistrar,
  unblockRegistrar,
  makeRegistrar,
  loadUsers,
  deleteUser,
  addRegistrar
};
