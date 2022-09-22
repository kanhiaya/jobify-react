import { useState } from 'react';
import { FormRow } from '../../component';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
//import update user function frm the slice
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  });

  // set show/hide options
  const [showEdit, setShowEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    dispatch(updateUser({ name, email, lastName, location }));
    setTimeout(() => {
      setShowEdit(false);
    }, 5000);
  };
  // set userdata to useState
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const edit = () => {
    setShowEdit(true);
  };
  return (
    <Wrapper>
      {showEdit === false && (
        <div className='edit-user'>
          <div className='edit-icon'>
            <button type='button' className='btn' onClick={edit}>
              <FaEdit />
            </button>
          </div>
          <ul>
            <li>Name:{userData.name}</li>
            <li>email:{userData.email}</li>
            <li>lastName:{userData.lastName}</li>
            <li>location:{userData.location}</li>
          </ul>
        </div>
      )}
      {showEdit === true && (
        <form onSubmit={handleSubmit}>
          <h3>profile</h3>
          <div className='form-center'>
            <FormRow
              type='text'
              name='name'
              value={userData.name}
              handleChange={handleChange}
            />
            <FormRow
              type='text'
              labelText='last name'
              name='lastName'
              value={userData.lastName}
              handleChange={handleChange}
            />
            <FormRow
              type='email'
              name='email'
              value={userData.email}
              handleChange={handleChange}
            />
            <FormRow
              type='text'
              name='location'
              value={userData.location}
              handleChange={handleChange}
            />
            <button
              className='btn btn-block'
              type='submit'
              disabled={isLoading}>
              {isLoading ? 'Please Wait...' : 'save changes'}
            </button>
          </div>
        </form>
      )}
    </Wrapper>
  );
};

export default Profile;
