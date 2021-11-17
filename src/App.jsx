import React from 'react';
import { Routes, Route, useSearchParams, useParams } from 'react-router-dom';
import Homepage from './views/Homepage';
import Redirect from './views/Redirect';
import './App.css';
import { encodeState } from './utils/state.js';

import { TermsOfUse, PrivacyNotice } from './views/LegalContent';
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import translationDE from './locales/de.json';
import translationEN from './locales/en.json';
import translationES from './locales/es.json';
import translationNL from './locales/nl.json';
import LanguageDetector from './utils/lang.js';

function App() {
  _initInternationalization();
  
  return (
    <main>
      <Routes>
        <Route path='/' element={<UrlParameterRouter />}/>
        <Route path='/terms-of-use' element={<TermsOfUse />}/>
        <Route path='/privacy-notice' element={<PrivacyNotice />}/>
      </Routes>
    </main>    
  );
}

function UrlParameterRouter() {

  const locationHash = window.location.hash;
  const urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.get("code")) {
    return (
      <div className="App">
        <Redirect oauthResponseParams={ urlParams } />
      </div>
    );
  }
  
  if (urlParams.get("client_id") && !urlParams.get("redirect_uri")) {
    return (
      <Homepage oauthRequestParams={ _defaultAuthRequestParams(urlParams.get("client_id")) } />
    );
  } 
  
  return (
    <Homepage oauthRequestParams={ _oauthRequestParams() } />
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

function _oauthRequestParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const accessType = urlParams.get("access_type");
  
  if (accessType) {
    urlParams.set('state', encodeState({
      systemRedirectUri: urlParams.get("redirect_uri"),
      shopRedirectUri: urlParams.get("state")
    }));
    urlParams.set('redirect_uri', _baseUrl());
    return urlParams;
  }
}

function _defaultAuthRequestParams(clientId) {
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
