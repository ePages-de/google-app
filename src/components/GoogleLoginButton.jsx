import './GoogleLoginButton.css';
import GoogleButtonBackground from './btn_google_light_normal_ios.svg';
import i18n from 'i18next';

function GoogleLoginButton(props) {
  
  const oauthInitUrl = 'https://accounts.google.com/o/oauth2/auth?' + props.oauthRequestParams.toString();
  
  console.log(oauthInitUrl);
  
  return (
    <a href={ oauthInitUrl }>
  		<button className="ep-button google-branding-button" id="GoogleOAuthButton" type="button" name="Save" style={{
  			background: `url(${GoogleButtonBackground})`
  		}}>
  			{ i18n.t('components.googleLoginButton.label') }
  		</button>
    </a>
	);
}

export default GoogleLoginButton;
