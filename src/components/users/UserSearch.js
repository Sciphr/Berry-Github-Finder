import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';
import { searchUsers } from '../../context/github/GithubActions';

const UserSearch = () => {
  const [text, setText] = useState('');

  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please enter something', 'error');
    } else {
      dispatch({ type: 'SET_LOADING' });
      const users = await searchUsers(text);
      dispatch({ type: 'GET_USERS', payload: users });
    }
  };

  const handleClear = (e) => {
    dispatch({ type: 'CLEAR_USERS' });
    setText('');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              className="w-full bg-gray-200 input input-lg text-black"
              placeholder="Search"
              value={text}
              onChange={handleChange}
            />
            <button type="submit" className="w-24 btn btn-lg">
              Go
            </button>
            {users.length > 0 && (
              <button className="btn btn-ghost btn-lg" onClick={handleClear}>
                Clear List
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserSearch;
