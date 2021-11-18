import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react'
import React from 'react';

import { initializeEnglishLocale } from '../../../../test/i18nForTests';
import ReturnPrompt from '../ReturnPrompt'

it('renders return prompt', async () => {
  initializeEnglishLocale();
  render(<ReturnPrompt oauthResponseParams={ _oauthResponseParamsWithState() } />)
  
  screen.getByText('Return now');
});

it('renders token generation snippet', async () => {
  initializeEnglishLocale();
  render(<ReturnPrompt oauthResponseParams={ _oauthResponseParamsWithoutState() } />)
  
  screen.getByText('Authentication successful');
});

function _oauthResponseParamsWithState() {
  const params = new URLSearchParams();
  
  params.set('state', 'eyJzeXN0ZW1SZWRpcmVjdFVyaSI6Imh0dHBzOi8vc2hvcHMuZXhhbXBsZS1yZXNlbGxlci5jb20iLCJvcmlnaW5hbFN0YXRlIjoiaHR0cHMlM0ElMkYlMkZteS1ncmVhdC1oYW5kaWNyYWZ0LmNvbSJ9');
  params.set('code', 'xxxxx');
  params.set('scope', 'email%20https://www.googleapis.com/auth/content%20https://www.googleapis.com/auth/siteverification%20https://www.googleapis.com/auth/adwords%20openid%20https://www.googleapis.com/auth/userinfo.email');
  params.set('authuser', '1');
  params.set('prompt', 'consent');
  
  return params;
}

function _oauthResponseParamsWithoutState() {
  const params = new URLSearchParams();
  
  params.set('code', 'xxxxx');
  params.set('scope', 'email%20https://www.googleapis.com/auth/content%20https://www.googleapis.com/auth/siteverification%20https://www.googleapis.com/auth/adwords%20openid%20https://www.googleapis.com/auth/userinfo.email');
  params.set('authuser', '1');
  params.set('prompt', 'consent');
  
  return params;
}
