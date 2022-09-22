import { useEffect } from 'react';
import { StatsContainer, ChartsContainer } from '../../component';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Loading';
import { showStats } from '../../features/allJobs/allJobsSlice';
const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJob
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
