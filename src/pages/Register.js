import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../component/index';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import user action from redux slice
import { loginUser, registerUSer } from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialState);

  //Redux action && select user initial state with store redux
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);

  //user navigation after succesfull registration
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  //handle chnage function and set user value in state
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(`${name}:${value}`);
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all the fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUSer({ name: name, email: email, password: password }));
  };

  //chnage the form
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {/* Name */}

        {values.isMember === false && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'submit'}
        </button>

        <p>
          <button
            type='button'
            className='btn btn-block btn-hipster'
            disabled={isLoading}
            onClick={() => {
              dispatch(
                loginUser({ email: 'testUser@test.com', password: 'secret' })
              );
            }}>
            {isLoading ? 'loading...' : 'demo'}
          </button>
        </p>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}

          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
