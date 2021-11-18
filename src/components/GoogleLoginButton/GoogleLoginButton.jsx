import './GoogleLoginButton.css';

import i18n from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';

import { encodeState } from '../../utils/state';

const oauthBaseUrl = 'https://accounts.google.com/o/oauth2/auth';

function GoogleLoginButton(props) {
  const oauthInitUrl = _buildOAuthInitUrl(props.oauthRequestParams);
  return (
    <a href={ oauthInitUrl }>
      <button className="ep-button google-branding-button" id="GoogleOAuthButton" type="button" name="Save" >
        { i18n.t('components.googleLoginButton.label') }
      </button>
    </a>
  );
}

GoogleLoginButton.propTypes = {
  oauthRequestParams: PropTypes.object.isRequired,
};

function _buildOAuthInitUrl(searchParams) {
  const clientId = searchParams.get('client_id');
  const redirectUri = searchParams.get('redirect_uri');
  
  if (clientId && !redirectUri) {
    return `${oauthBaseUrl}?${_defaultAuthRequestParams(searchParams)}`;
  } else {
    return `${oauthBaseUrl}?${_oauthRequestParams(searchParams)}`;
  }
}

function _oauthRequestParams(searchParams) {
  const urlParams = new URLSearchParams(searchParams.toString());
  const accessType = searchParams.get("access_type");

  if (accessType) {
    urlParams.set('state', encodeState({
      systemRedirectUri: urlParams.get("redirect_uri"),
      originalState: urlParams.get("state")
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

export default GoogleLoginButton;
