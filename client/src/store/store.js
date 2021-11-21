import { configureStore } from '@reduxjs/toolkit';

import { profileReducer, blankReducer } from './root-reducer';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    blank: blankReducer
  }
});

export default store;
