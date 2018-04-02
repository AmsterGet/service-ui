import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'redux-first-router-link';
import { isAuthorizedSelector } from 'controllers/auth';
import {LOGIN_PAGE} from 'controllers/pages';

export const authorizedRoute = Component =>
  connect(
	state => ({ authorized: isAuthorizedSelector(state) }) 
	, (dispatch, ownProps) => {
		return {
			redirect: () => dispatch({ type:LOGIN_PAGE })
		};
	})(({ authorized, redirect, ...otherProps }) => {
	if (authorized)
  		return <Component {...otherProps} />
	else
		redirect();
});
