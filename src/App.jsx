import Homepage from './views/Homepage';
import Redirect from './views/Redirect';
import './App.css';
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import translationDE from './locales/de.json';
import translationEN from './locales/en.json';
import translationES from './locales/es.json';
import translationNL from './locales/nl.json';
import LanguageDetector from './utils/lang.js';

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
  
  if (_isRequestComingFromAuthorizationServer()) {
    return (
      <div className="App">
        <Redirect />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Homepage oauthParams={ _oauthParams() } />
      </div>
    );
  }
}

function _oauthParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const accessType = urlParams.get("access_type");
  
  if (accessType) {
    urlParams.set('redirect_uri', 'http://localhost:3000');
    return urlParams;
  }
}

function _isRequestComingFromAuthorizationServer() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const authorizationCode = urlParams.get("code");
  
  return authorizationCode != null;
}

export default App;
