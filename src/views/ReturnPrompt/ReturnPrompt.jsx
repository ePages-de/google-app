import i18n from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import { decodeState } from '../../utils/state.js';

const secondsUntilAutoRedirect = 3;

const useCountDown = (start) => {
  const [counter, setCounter] = useState(start);
  useEffect(() => {
    if (counter === 0) {
      return;
    }
    setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
  }, [counter]);
  return counter;
};

function ReturnPrompt(props) {
  const oauthResponseParams = props.oauthResponseParams;

  if (_isOauthResponseForManualTokenGeneration(oauthResponseParams.get("state"))) {
    return (<TokenGenerationSnippet oauthCode={ oauthResponseParams.get("code") } />);
  }
  
  const returnUrl = _buildReturnUrl(oauthResponseParams);
  
  _scheduleAutoRedirect(returnUrl);
    
  return (
    <div className="App">

      <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
          <div className="container px-5">
              <img src={process.env.PUBLIC_URL + '/img/Epages_Logo.png'} style={{ maxWidth: '200px' }} alt="ePages Logo" />
          </div>
      </nav>

      <header className="masthead">
          <div className="container px-5">
              <div className="row gx-5 align-items-center">
                <div className="col-lg-12">
                    <div className="mb-7 mb-lg-0 text-center text-lg-start">
                        <h1 className="display-4 lh-4 mb-6">
                          { i18n.t('views.callback.heading.label') }
                        </h1>
                        
                        <Countdown seconds={ secondsUntilAutoRedirect } />
                        <p>
                          <a href={ returnUrl }>
                            <button type="button" className="btn btn-primary">
                              { i18n.t('views.callback.redirectNowButton.label') }
                            </button>
                          </a>
                        </p>
                    </div>
                </div>
              </div>
          </div>
      </header>
      
      <div className="fixedFooter">
        <Footer />
      </div>
    </div>
  );
}

ReturnPrompt.propTypes = {
  oauthResponseParams: PropTypes.object.isRequired,
};

function Countdown(props) {
  const timeLeft = useCountDown(props.seconds);
  return (
    <p className="lead fw-normal text-muted mb-5">
    { i18n.t('views.callback.redirectionMessage.label', {count: timeLeft}) }
  </p>
  );
}

Countdown.propTypes = {
  seconds: PropTypes.number.isRequired,
};

function TokenGenerationSnippet(props) {
  const baseUrl = window.location.href.replace(/\/\?.*/g, '');
  const curlSnippet =  `curl -X POST \\
  -F 'code=${props.oauthCode}' \\
  -F 'client_id='$GOOGLE_CLIENT_ID \\
  -F 'client_secret='$GOOGLE_CLIENT_SECRET \\
  -F 'redirect_uri=${baseUrl}' \\
  -F 'access_type=offline' \\
  -F 'grant_type=authorization_code' \\
  https://accounts.google.com/o/oauth2/token
  `;
  
  return (
    <div className="App">
      <div className="container">
        <h1>Authentication successful</h1>
        <textarea rows="10" cols="100" defaultValue={ curlSnippet } />
      </div>
      
      <div className="fixedFooter">
        <Footer />
      </div>
    </div>
  );
}

TokenGenerationSnippet.propTypes = {
  oauthCode: PropTypes.string.isRequired,
};

function _isOauthResponseForManualTokenGeneration(state) {
  const decodedState = decodeState(state);
  return !('originalState' in decodedState);
}

function _buildReturnUrl(oauthResponseParams) {
  const state = decodeState(oauthResponseParams.get("state"));
  
  var redirectParams = new URLSearchParams();
  redirectParams.set('state', state.originalState);
  redirectParams.set('code', oauthResponseParams.get('code'));
  redirectParams.set('scope', oauthResponseParams.get('scope'));
  redirectParams.set('prompt', oauthResponseParams.get('prompt'));
  
  
  if (state.systemRedirectUri.includes('?')) {
    return state.systemRedirectUri + '&' + redirectParams.toString();
  } else {
    return state.systemRedirectUri + '?' + redirectParams.toString();
  }
}

function _scheduleAutoRedirect(returnUrl) {
  setTimeout(function() {
    window.location.replace(returnUrl);
  }, secondsUntilAutoRedirect * 1000);
}

export default ReturnPrompt;
