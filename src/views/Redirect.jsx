import './Redirect.css';

function Redirect(props) {
  
  const oauthResponseParams = props.oauthResponseParams;
  const oauthCode = oauthResponseParams.get("code");
  const oauthState = oauthResponseParams.get("state");
  
  // If the callback doesn't have a state, then OAuth request wasn't initiated
  // by the MBO but by a developer who wants to manually generate a token.
  if(!oauthState) {
    return (
      <div className="App">
  			<h1>Authentication successful</h1>
        <textarea id="w3review" name="w3review" rows="10" cols="100">
          { _buildTokenGenerationSnippet(oauthCode) }
        </textarea>
      </div>
    );
  }
  
  return (
    <div className="App">
    
			<h1>Authentication successful</h1>
    
    </div>
  );
}

function _buildTokenGenerationSnippet(oauthCode) {
  const baseUrl = window.location.href.replace(/\/\?.*/g, '');
  
  return `curl -X POST \\
  -F 'code=${oauthCode}' \\
  -F 'client_id='$GOOGLE_CLIENT_ID \\
  -F 'client_secret='$GOOGLE_CLIENT_SECRET \\
  -F 'redirect_uri=${baseUrl}' \\
  -F 'access_type=offline' \\
  -F 'grant_type=authorization_code' \\
  https://accounts.google.com/o/oauth2/token
  `;
}

export default Redirect;
