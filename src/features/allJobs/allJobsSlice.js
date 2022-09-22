import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
// import customFetch from '../../utils/axios';
import { showStatsThunk, getAllJobsThunk } from './allJobsThunk';
// this is for search container
const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

//get all job
export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk);

// get stats
export const showStats = createAsyncThunk('/job/showStats', showStatsThunk);

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    //for search container chnage
    handleChange: (state, { payload: { name, value } }) => {
      //all the request start with page no. 1
      state.page = 1;
      state[name] = value;
    },
    //for clear search field
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    //chnage page number on click on the pagination
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    //remove store data
    clearAllJobsState: () => initialState,
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
      //set pagination
      state.numOfPages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    //set extra reducer for stats
    [showStats.pending]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
