import { createSlice, configureStore } from "@reduxjs/toolkit";

const userFromLocal = localStorage.getItem("user");

let user = userFromLocal ? JSON.parse(userFromLocal) : {};

export const userReduce = createSlice({
  name: "user",
  initialState: user,
  reducers: {
    setUserHander(state, action) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    pushBlessHandler(state, action) {
      state.blessings.push(action.payload);
    },
    removeBlessHandler(state, action) {
      state.filter((bless) => bless.id !== action.id);
    },
  },
});

const store = configureStore({
  reducer: {
    user: userReduce.reducer,
  },
});
export const { setUserHander, pushBlessHandler, removeBlessHandler } =
  userReduce.actions;
export default store;
