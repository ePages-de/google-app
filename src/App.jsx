import i18n from 'i18next';
import React from 'react';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter, HashRouter, Route, Routes, useSearchParams } from 'react-router-dom';

import translationDE from './locales/de.json';
import translationEN from './locales/en.json';
import translationES from './locales/es.json';
import translationNL from './locales/nl.json';
import LanguageDetector from './utils/lang.js';
import { encodeState } from './utils/state.js';
import Homepage from './views/Homepage';
import { PrivacyNotice,TermsOfUse } from './views/LegalContent';
import ReturnPrompt from './views/ReturnPrompt';

function App() {
  _initInternationalization();
  
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<UrlParameterRouter />}/>
        </Routes>
      </BrowserRouter>
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<div />}/>
          <Route path='/terms-of-use' element={<TermsOfUse />}/>
          <Route path='/privacy-notice' element={<PrivacyNotice />}/>
        </Routes>
      </HashRouter>
    </main>    
  );
}

function UrlParameterRouter() {
  const [searchParams] = useSearchParams();
  
  const code = searchParams.get("code");
  const clientId = searchParams.get("client_id");
  const redirectUri = searchParams.get("redirect_uri");
  
  if (code) {
    return (
      <div className="App">
        <ReturnPrompt oauthResponseParams={ searchParams } />
      </div>
    );
  }
  
  if (clientId && !redirectUri) {
    return (
      <Homepage oauthRequestParams={ _defaultAuthRequestParams(searchParams) } />
    );
  } 
  
  return (
    <Homepage oauthRequestParams={ _oauthRequestParams(searchParams) } />
  );
}

function _initInternationalization() {
  const resources = {
    de: {
      translation: translationDE
    },
    en: {
      translation: translationEN
    },
    es: {
      translation: translationES
    },
    nl: {
      translation: translationNL
    }
  };
  
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources
    })
  ;
}

function _oauthRequestParams(searchParams) {
  const urlParams = new URLSearchParams(searchParams.toString());
  const accessType = searchParams.get("access_type");
  
  if (accessType) {
    urlParams.set('state', encodeState({
      systemRedirectUri: urlParams.get("redirect_uri"),
      shopRedirectUri: urlParams.get("state")
    }));
    urlParams.set('redirect_uri', _baseUrl());
    return urlParams;
  }
}

function _defaultAuthRequestParams(searchParams) {
  const clientId = searchParams.get("client_id");
  const params = new URLSearchParams();
  
  params.set('client_id', clientId);
  params.set('response_type', 'code');
  params.set('redirect_uri', _baseUrl());
  params.set('access_type', 'offline');
  params.set('scope', 'https://www.googleapis.com/auth/content https://www.googleapis.com/auth/siteverification https://www.googleapis.com/auth/adwords');
  params.set('prompt', 'consent');
  
  return params;
}

function _baseUrl() {
  return window.location.href.replace(/\/\?.*/g, '');
}

export default App
