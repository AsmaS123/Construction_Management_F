import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Auth from '../../middleware/auth';

const ProtectedRoute = ({ children, allowedRoles }:any) => {
  
  const role = Auth()

  if (!role) return <Navigate to="/" />;

  if(role && role.length>0){
    const hasCommonElement = role.some((item:any) => allowedRoles.includes(item));
    if(!hasCommonElement){
      return <Navigate to="/unauthorised" />; // or a 403 page
    }
  }
  return children;
};

export default ProtectedRoute;






  // const user :any= Cookies.get('user'); // 'token' is the cookie name
  //  if(user && JSON.parse(user) && (JSON.parse(user)).roles && JSON.parse(user).roles.length>0){
  //   role = JSON.parse(user).roles;
  //  }
 




  // if (!allowedRoles.includes(role)) {
  //   return <Navigate to="/unauthorised" />; // or a 403 page
  // }