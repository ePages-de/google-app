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

if('prevents redirect to external uri', async () => {
  render(<ReturnPrompt oauthResponseParams={ _oauthResponseParamsWithExternalRedirectUri() } />)
  
  screen.getByText('403 Forbidden');
});

function _oauthResponseParamsWithState() {
  const params = new URLSearchParams();
  
  // {"systemRedirectUri":"https://shops.reseller.epages.systems","originalState":"https://shop.example.com"}
  params.set('state', 'eyJzeXN0ZW1SZWRpcmVjdFVyaSI6Imh0dHBzOi8vc2hvcHMucmVzZWxsZXIuZXBhZ2VzLnN5c3RlbXMiLCJvcmlnaW5hbFN0YXRlIjoiaHR0cHMlM0ElMkYlMkZzaG9wLmV4YW1wbGUuY29tIn0=');
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

function _oauthResponseParamsWithExternalRedirectUri() {
  const params = new URLSearchParams();
  
  // {"systemRedirectUri":"https://phishing.example.com","originalState":"https://shop.example.com"}
  params.set('state', 'eyJzeXN0ZW1SZWRpcmVjdFVyaSI6Imh0dHBzOi8vcGhpc2hpbmcuZXhhbXBsZS5jb20iLCJvcmlnaW5hbFN0YXRlIjoiaHR0cHMlM0ElMkYlMkZzaG9wLmV4YW1wbGUuY29tIn0=');
  params.set('code', 'xxxxx');
  params.set('scope', 'email%20https://www.googleapis.com/auth/content%20https://www.googleapis.com/auth/siteverification%20https://www.googleapis.com/auth/adwords%20openid%20https://www.googleapis.com/auth/userinfo.email');
  params.set('authuser', '1');
  params.set('prompt', 'consent');
  
  return params;
}
