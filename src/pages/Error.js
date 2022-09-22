import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';
import Logo from '../component/Logo';
function Error() {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='404 Not Found' />
        <h3>Oops! Page Not Found</h3>
        <p>404 Error, Please check url carefully.</p>
        <Link to='/'>back home</Link>
      </div>
    </Wrapper>
  );
}

export default Error;
