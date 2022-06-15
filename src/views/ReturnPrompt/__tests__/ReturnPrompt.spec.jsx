import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react'
import React from 'react';

import { initializeEnglishLocale } from '../../../../test/i18nForTests';
import ReturnPrompt from '../ReturnPrompt'

it('renders return prompt', async () => {
  initializeEnglishLocale();
  render(<ReturnPrompt oauthResponseParams={ _oauthResponseParamsWithState() } />)
  
  screen.getByText('Back');
});

it('renders token generation snippet', async () => {
  initializeEnglishLocale();
  render(<ReturnPrompt oauthResponseParams={ _oauthResponseParamsWithoutState() } />)
  
  screen.getByText('Authentication successful');
});

it('prevents redirect to external uri', async () => {
  render(<ReturnPrompt oauthResponseParams={ _oauthResponseParamsWithForbiddenExternalRedirectUri() } />)
  
  screen.getByText('403 Forbidden');
});

it('prevents redirect to similar external uri', async () => {
  render(<ReturnPrompt oauthResponseParams={ _oauthResponseParamsWithForbiddedButSimilarExternalRedirectUri() } />)
  
  screen.getByText('403 Forbidden');
});

it('allow redirect to exactly matching external uri', async () => {
  initializeEnglishLocale();
  render(<ReturnPrompt oauthResponseParams={ _oauthResponseParamsWithExactlyMatchingExternalRedirectUri() } />)
  
  screen.getByText('Back');
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

function _oauthResponseParamsWithForbiddenExternalRedirectUri() {
  const params = new URLSearchParams();
  
  // {"systemRedirectUri":"https://phishing.example.com","originalState":"https://shop.example.com"}
  params.set('state', 'eyJzeXN0ZW1SZWRpcmVjdFVyaSI6Imh0dHBzOi8vcGhpc2hpbmcuZXhhbXBsZS5jb20iLCJvcmlnaW5hbFN0YXRlIjoiaHR0cHMlM0ElMkYlMkZzaG9wLmV4YW1wbGUuY29tIn0=');
  params.set('code', 'xxxxx');
  params.set('scope', 'email%20https://www.googleapis.com/auth/content%20https://www.googleapis.com/auth/siteverification%20https://www.googleapis.com/auth/adwords%20openid%20https://www.googleapis.com/auth/userinfo.email');
  params.set('authuser', '1');
  params.set('prompt', 'consent');
  
  return params;
}

function _oauthResponseParamsWithForbiddedButSimilarExternalRedirectUri() {
  const params = new URLSearchParams();
  
  // { systemRedirectUri: 'https://phising.fakeepages.com', originalState: 'https%3A%2F%2Fshop.example.com',}
  params.set('state', 'eyJzeXN0ZW1SZWRpcmVjdFVyaSI6Imh0dHBzOi8vcGhpc2luZy5mYWtlZXBhZ2VzLmNvbSIsIm9yaWdpbmFsU3RhdGUiOiJodHRwcyUzQSUyRiUyRnNob3AuZXhhbXBsZS5jb20ifQ==');
  params.set('code', 'xxxxx');
  params.set('scope', 'email%20https://www.googleapis.com/auth/content%20https://www.googleapis.com/auth/siteverification%20https://www.googleapis.com/auth/adwords%20openid%20https://www.googleapis.com/auth/userinfo.email');
  params.set('authuser', '1');
  params.set('prompt', 'consent');
  
  return params;
}

function _oauthResponseParamsWithExactlyMatchingExternalRedirectUri() {
  const params = new URLSearchParams();
  
  // { systemRedirectUri: 'https://epages.com', originalState: 'https%3A%2F%2Fshop.example.com',}
  params.set('state', 'eyJzeXN0ZW1SZWRpcmVjdFVyaSI6Imh0dHBzOi8vZXBhZ2VzLmNvbSIsIm9yaWdpbmFsU3RhdGUiOiJodHRwcyUzQSUyRiUyRnNob3AuZXhhbXBsZS5jb20ifQ==');
  params.set('code', 'xxxxx');
  params.set('scope', 'email%20https://www.googleapis.com/auth/content%20https://www.googleapis.com/auth/siteverification%20https://www.googleapis.com/auth/adwords%20openid%20https://www.googleapis.com/auth/userinfo.email');
  params.set('authuser', '1');
  params.set('prompt', 'consent');
  
  return params;
}