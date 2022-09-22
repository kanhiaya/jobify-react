import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/user/userSlice';
// import { logoutUser } from '../features/user/userSlice';
import { clearStore } from '../features/user/userSlice';

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  //set dropwdown state
  const [showLogout, setShowLogout] = useState(false);

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  const logout = () => {
    dispatch(clearStore('Logout User...'));
  };

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-txt'>Dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'show-dropdown dropdown' : 'dropdown'}>
            <button className='btn' type='dropdown-btn' onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
