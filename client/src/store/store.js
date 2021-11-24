import { configureStore } from '@reduxjs/toolkit';

import {
  profileReducer,
  blankReducer,
  registrarReducer,
  extractReducer
} from './root-reducer';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    blank: blankReducer,
    people: registrarReducer,
    extract: extractReducer
  }
});

export default store;
