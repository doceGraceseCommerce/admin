import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Sidebar from './SideBar/Sidebar';

const isLogin = () => {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isLogin()
        ?
        <div className="wrap-all">
          <div>
            <Sidebar />
          </div>
          <Component {...props} />
        </div>
        :
        <Redirect to="/Login" />
    )} />
  );
};

export default PrivateRoute;