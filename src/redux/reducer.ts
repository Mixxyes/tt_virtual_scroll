import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ParamType = {
  start: number;
};

const initialParam: ParamType = {
  start: 0,
};

const fetchParamSlice = createSlice({
  name: 'fetchParams',
  initialState: initialParam,
  reducers: {
    setFetchParam: (state, action: PayloadAction<number>) => {
      state.start = action.payload;
    },
  },
});

export const { setFetchParam } = fetchParamSlice.actions;
export const fetchParamReducer = fetchParamSlice.reducer;
