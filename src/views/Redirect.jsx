import './Redirect.css';
import { decodeState } from '../utils/state.js';

function Redirect(props) {
  
  const oauthResponseParams = props.oauthResponseParams;
  
  const oauthCode = oauthResponseParams.get("code");
  const state = decodeState(oauthResponseParams.get("state"));
  
  // If the callback doesn't have a state, then OAuth request wasn't initiated
  // by the MBO but by a developer who wants to manually generate a token.
  if (!state.shopRedirectUri) {
    return (<TokenGenerationSnippet oauthCode={ oauthCode } />);
  }
  
  var redirectParams = new URLSearchParams();
  redirectParams.set('state', state.shopRedirectUri);
  redirectParams.set('code', oauthResponseParams.get('code'));
  redirectParams.set('scope', oauthResponseParams.get('scope'));
  redirectParams.set('prompt', oauthResponseParams.get('prompt'));
  
  // TODO: Consider if we should test whether systemRedirectUri already contains a '?'.
  const returnUrl = state.systemRedirectUri + '&' + redirectParams.toString();
  
  console.log("return url: " + returnUrl);
  
  return (
    <div className="App">
    
			<h1>Authentication successful</h1>
    
      <a href={ returnUrl }>Go back to shop</a>
    
    </div>
  );
}

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
      <h1>Authentication successful</h1>
      <textarea id="w3review" name="w3review" rows="10" cols="100">
        { curlSnippet }
      </textarea>
    </div>
  );
}

function _buildTokenGenerationSnippet(oauthCode) {

}

export default Redirect;
