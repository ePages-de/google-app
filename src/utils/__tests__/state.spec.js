import '@testing-library/jest-dom';

import { encodeState } from '../state'

it('encodes state', async () => {
  const encodedState = encodeState({
    systemRedirectUri: 'https://shops.reseller.epages.systems',
    originalState: 'https%3A%2F%2Fshop.example.com',
  });
  
  expect(encodedState).toBe('eyJzeXN0ZW1SZWRpcmVjdFVyaSI6Imh0dHBzOi8vc2hvcHMucmVzZWxsZXIuZXBhZ2VzLnN5c3RlbXMiLCJvcmlnaW5hbFN0YXRlIjoiaHR0cHMlM0ElMkYlMkZzaG9wLmV4YW1wbGUuY29tIn0=');
});
