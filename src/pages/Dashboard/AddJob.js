import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow } from '../../component';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormRowSelect from '../../component/FormRowSelect';
import {
  handleChange,
  clearValues,
  editJob,
  createJob,
} from '../../features/job/jobSlice';

import { useEffect } from 'react';

const AddJob = () => {
  //get the user for setup the default location of the user
  const { user } = useSelector((store) => store.user);

  //load all the field from the jobslice
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    //if is edditing than
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //send username and values to reducer to save values
    dispatch(handleChange({ name, value }));
  };

  //run always when job is editiing by the user
  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }));
    }
  }, []);

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>

        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* job type */}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}>
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}>
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
