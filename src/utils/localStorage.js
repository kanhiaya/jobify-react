//setup user to localstorage
export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// remove user from local storage

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

//get user from localstorage

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  //if result is not null than convert result in json and return
  const user = result ? JSON.parse(result) : null;
  return user;
};
