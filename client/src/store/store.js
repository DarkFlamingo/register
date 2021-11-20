import { configureStore } from '@reduxjs/toolkit';

import { profileReducer } from './root-reducer';

const store = configureStore({
  reducer: {
    profile: profileReducer
  }
});

export default store;
