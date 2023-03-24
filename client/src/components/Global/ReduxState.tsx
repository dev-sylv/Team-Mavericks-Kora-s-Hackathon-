import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { BusinessData } from "../AllInterface/Allinterface";

const initialState = {
  bizClient: {} as BusinessData | null,
  //   Admin: {} as BusinessData | null,
};

const ReduxState = createSlice({
  name: "GiftCard",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<BusinessData>) => {
      state.bizClient = payload;
    },

    logout: (state) => {
      state.bizClient = null;
    },
  },
});

export const { login, logout } = ReduxState.actions;

export default ReduxState.reducer;
