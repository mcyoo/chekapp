import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logIn, logOut} from '../redux/usersSlice';
import Loading from '../screens/loading';

export default () => {
  const {isLoggedIn, token} = useSelector(state => state.usersReducer);
  return (
    <Loading
      isLoggedIn={isLoggedIn}
      jwt_token={token}
      dispatch={useDispatch()}
    />
  );
};
