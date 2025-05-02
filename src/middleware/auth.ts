import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Auth  = ()=>{
    const user :any= Cookies.get('user'); // 'token' is the cookie name
    let role :any;
    // debugger
    if(user && JSON.parse(user) && (JSON.parse(user)).roles && JSON.parse(user).roles.length>0){
    role = JSON.parse(user).roles;
    }
    return role;
}

export default Auth;