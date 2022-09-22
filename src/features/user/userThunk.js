import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { logoutUser } from './userSlice';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';
//register function
export const registerUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/auth/register', user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/auth/login', user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.patch('/auth/updateUser', user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

//clear all the store on logout
export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    // logout user
    thunkAPI.dispatch(logoutUser(message));
    // clear jobs value
    thunkAPI.dispatch(clearAllJobsState());
    // clear job input values
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};
