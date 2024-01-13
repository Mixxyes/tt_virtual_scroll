import { configureStore } from '@reduxjs/toolkit';
import { postApi } from './api';

import { fetchParamReducer } from './reducer';

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    fetchParam: fetchParamReducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
