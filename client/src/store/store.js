import { configureStore } from '@reduxjs/toolkit';

import {
  profileReducer,
  blankReducer,
  registrarReducer,
  extractReducer,
  logReducer
} from './root-reducer';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    blank: blankReducer,
    people: registrarReducer,
    extract: extractReducer,
    log: logReducer
  }
});

export default store;
