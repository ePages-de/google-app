import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react'
import React from 'react';

import { initializeEnglishLocale } from '../../../../test/i18nForTests';
import Homepage from '../Homepage'

it('renders homepage', async () => {
  initializeEnglishLocale();
  render(<Homepage />)
  
  screen.getByText('Google Smart Shopping App');
  screen.getByText('ePages GmbH 2021. All rights reserved.');
});
