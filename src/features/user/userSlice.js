import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

//thunk function import
import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
} from '../user/userThunk';

//clear store
import { clearStoreThunk } from './userThunk';

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

export const registerUSer = createAsyncThunk(
  'user/registerUSer',
  registerUserThunk
  // async (user, thunkAPI) => {
  //   try {
  //     const resp = await customFetch.post('/auth/register', user);
  //     return resp.data;
  //   } catch (error) {
  //     return thunkAPI.rejectWithValue(error.response.data.msg);
  //   }
  // }
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  loginUserThunk
  // async (user, thunkAPI) => {
  //   try {
  //     const resp = await customFetch.post('/auth/login', user);
  //     return resp.data;
  //   } catch (error) {
  //     return thunkAPI.rejectWithValue(error.response.data.msg);
  //   }
  // }
);

// update user with token
export const updateUser = createAsyncThunk(
  '/auth/updateUser',
  updateUserThunk
  // async (user, thunkAPI) => {
  //   try {
  //     const resp = await customFetch.patch('/auth/updateUser', user);
  //     return resp.data;
  //   } catch (error) {
  //     // console.log(error.response);
  //     if (error.response.status === 401) {
  //       thunkAPI.dispatch(logoutUser());
  //       return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  //     }
  //     return thunkAPI.rejectWithValue(error.response.data.msg);
  //   }
  // }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: {
    [registerUSer.pending]: (state) => {
      state.isLoading = true;
    },

    [registerUSer.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const { user } = payload;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello There ${user.name}`);
    },

    [registerUSer.rejected]: (state, { payload }) => {
      state.isLoading = true;
      toast.error(payload);
    },
    //login user
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },

    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const { user } = payload;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome Back ${user.name}`);
    },

    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = true;
      toast.error(payload);
    },
    //update user
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },

    [updateUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const { user } = payload;
      state.user = user;
      // set user to local storage
      addUserToLocalStorage(user);
      toast.success('User Updated');
    },

    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = true;
      toast.error(payload);
    },
    [clearStore.rejected]: () => {
      toast.error('There was an error');
    },
  },
});
export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
