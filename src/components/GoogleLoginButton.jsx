import './GoogleLoginButton.css';
import GoogleButtonBackground from './btn_google_light_normal_ios.svg';

function GoogleLoginButton() {
  
  return (
		<button className="ep-button google-branding-button" id="GoogleOAuthButton" type="button" name="Save" style={{
			background: `url(${GoogleButtonBackground})`
		}}>
			Sign in with Google
		</button>
	);
}

export default GoogleLoginButton;
