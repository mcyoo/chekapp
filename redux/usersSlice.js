import {createSlice} from '@reduxjs/toolkit';
import api from '../api';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
    },
    recap(state, action) {
      state.isLoggedIn = true;
    },
  },
});

export const {logIn, logOut, recap} = userSlice.actions;

export const userSave = token => async dispatch => {
  try {
    dispatch(logIn({token}));
  } catch (e) {
    alert('redux save error');
  }
};

export default userSlice.reducer;
