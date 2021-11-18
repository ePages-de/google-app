import i18n from 'i18next';
import React from 'react';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter, HashRouter, Route, Routes, useSearchParams } from 'react-router-dom';

import translationDE from './locales/de.json';
import translationEN from './locales/en.json';
import translationES from './locales/es.json';
import translationNL from './locales/nl.json';
import LanguageDetector from './utils/lang.js';
import Homepage from './views/Homepage/Homepage';
import { PrivacyNotice,TermsOfUse } from './views/LegalContent';
import ReturnPrompt from './views/ReturnPrompt/ReturnPrompt';

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
      <Homepage oauthRequestParams={ searchParams } />
    );
  } 
  
  return (
    <Homepage oauthRequestParams={ searchParams } />
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

export default App
