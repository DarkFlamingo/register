import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { registrar as registrarService } from 'src/services/services';

const ActionType = {
  SET_REGISTRARS: 'registrars/set-registrars',
  LOAD_REGISTRARS: 'registrars/load',
  BLOCKED_REGISTRARS: 'registrars/block',
  UNBLOCKED_REGISTRARS: 'registrars/unblock'
};

const setRegistrars = createAction(ActionType.SET_REGISTRARS, registrars => ({
  payload: {
    registrars
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

export { setRegistrars, loadRegistrars, blockRegistrar, unblockRegistrar };
