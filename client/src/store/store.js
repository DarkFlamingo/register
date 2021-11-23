import { configureStore } from '@reduxjs/toolkit';

import {
  profileReducer,
  blankReducer,
  registrarReducer
} from './root-reducer';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    blank: blankReducer,
    registrar: registrarReducer
  }
});

export default store;
