import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react'
import React from 'react';

import { initializeEnglishLocale } from '../../../../test/i18nForTests';
import GoogleLoginButton from '../GoogleLoginButton'
import { encodeState } from '../../../utils/state';

it('renders google login button', async () => {
  initializeEnglishLocale();
  render(<GoogleLoginButton oauthRequestParams={ _oauthRequestParams() } />);
  
  screen.getByText('Sign in with Google');
  
  const link = screen.getByRole('link');
  expect(link.getAttribute('href')).toContain('state=eyJzeXN0ZW1SZWRpcmVjdFVyaSI6Imh0dHBzOi8vc2hvcHMuZXhhbXBsZS1yZXNlbGxlci5jb20iLCJzaG9wUmVkaXJlY3RVcmkiOiJodHRwcyUzQSUyRiUyRm15LWdyZWF0LWhhbmRpY3JhZnQuY29tIn0%3D');
});

function _oauthRequestParams() {  
  const params = new URLSearchParams();
  
  params.set('response_type', 'code');
  params.set('redirect_uri', 'https://shops.example-reseller.com');
  params.set('client_id', '746318976034-e9r0hta4db0d21e56d7eh1nhi8n4kj4d.apps.googleusercontent.com');
  params.set('access_type', 'offline');
  params.set('scope', 'https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcontent https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fsiteverification https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email');
  params.set('prompt', 'consent');
  params.set('state', 'https%3A%2F%2Fmy-great-handicraft.com');
  
  return params;
}
