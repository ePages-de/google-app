import Homepage from './views/Homepage';
import Redirect from './views/Redirect';
import LegalContent from './views/LegalContent';
import './App.css';
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import translationDE from './locales/de.json';
import translationEN from './locales/en.json';
import translationES from './locales/es.json';
import translationNL from './locales/nl.json';
import LanguageDetector from './utils/lang.js';
import { encodeState } from './utils/state.js';

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

function App() {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources
    })
  ;
  
  const locationHash = window.location.hash;
  const urlParams = new URLSearchParams(window.location.search);
  
  if (locationHash === "#/terms-of-use") {
    return(<LegalContent filename={ i18n.t('legalContent.termsOfUse') }/>);
  }
  if (locationHash === "#/privacy-notice") {
    return(<LegalContent filename={ i18n.t('legalContent.privacyNotice') }/>);
  }
  
  if (urlParams.get("code")) {
    return (
      <div className="App">
        <Redirect oauthResponseParams={ urlParams } />
      </div>
    );
  } else if (urlParams.get("client_id") && !urlParams.get("redirect_uri")) {
    const clientId = urlParams.get("client_id");
    return (
      <div className="App">
        <Homepage oauthRequestParams={ _defaultAuthRequestParams(clientId) } />
      </div>    
    );
  } else {
    return (
      <div className="App">
        <Homepage oauthRequestParams={ _oauthRequestParams() } />
      </div>
    );
  }
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
  params.set('flowName', 'GeneralOAuthFlow');
  
  return params;
}

function _oauthResponseParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  if (code) {
    return urlParams;
  }
}

function _isRequestComingFromAuthorizationServer() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const authorizationCode = urlParams.get("code");
  
  return authorizationCode != null;
}

function _baseUrl() {
  return window.location.href.replace(/\/\?.*/g, '');
}

export default App;
