import './GoogleLoginButton.css';
import GoogleButtonBackground from './btn_google_light_normal_ios.svg';
import i18n from 'i18next';

function GoogleLoginButton() {
  
  return (
		<button className="ep-button google-branding-button" id="GoogleOAuthButton" type="button" name="Save" style={{
			background: `url(${GoogleButtonBackground})`
		}}>
			{ i18n.t('components.googleLoginButton.label') }
		</button>
	);
}

export default GoogleLoginButton;
