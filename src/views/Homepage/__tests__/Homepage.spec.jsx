import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react'
import React from 'react';

import { initializeEnglishLocale } from '../../../../test/i18nForTests';
import Homepage from '../Homepage'

it('renders homepage', async () => {
  initializeEnglishLocale();
  render(<Homepage />)
  
  screen.getByText('Google Smart Shopping App');
  screen.getByText('© ePages GmbH 2021. All rights reserved.');
});

it('renders google login button', async () => {
  initializeEnglishLocale();
  render(<Homepage oauthRequestParams={ _oauthRequestParams() } />)
  
  screen.getByText('Sign in with Google');
});

it('does not render google login button without request params', async () => {
  initializeEnglishLocale();
  render(<Homepage />)
  
  const googleLoginButton = screen.queryByText('Sign in with Google');
  expect(googleLoginButton).toBeNull();
});

it('does not render google login button without oauth request params', async () => {
  initializeEnglishLocale();
  render(<Homepage oauthRequestParams={ new URLSearchParams() } />)
  
  const googleLoginButton = screen.queryByText('Sign in with Google');
  expect(googleLoginButton).toBeNull();
});

function _oauthRequestParams() {
  const params = new URLSearchParams();
  
  params.set('response_type', 'code');
  params.set('redirect_uri', 'https%3A%2F%2Fshops.example-reseller.com');
  params.set('client_id', '746318976034-e9r0hta4db0d21e56d7eh1nhi8n4kj4d.apps.googleusercontent.com');
  params.set('access_type', 'offline');
  params.set('scope', 'https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcontent https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fsiteverification https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email');
  params.set('prompt', 'consent');
  params.set('state', 'https%3A%2F%2Fmy-great-handicraft.com');
  
  return params;
}
