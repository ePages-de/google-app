import React, { Component } from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';

class Init extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientId: '',
			scopes: "test\ntest"
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		console.log("On submit!");
		
		var params = '?';
		params += `client_id=${ this.state.clientId }`;
		params += `&response_type=code`;
		params += `&redirect_uri=http://localhost:3000`;
		params += `&scope=https://www.googleapis.com/auth/content+https://www.googleapis.com/auth/siteverification+https://www.googleapis.com/auth/adwords`;
		params += `&access_type=offline`;
		params += `&prompt=consent`;
		
		const targetUrl = decodeURIComponent(_baseUrl() + '/' + params);
		
		window.location.replace(targetUrl);
	}
	
  render() {
    return <div>
			<h1>Init OAuth</h1>
			
			<form onSubmit={this.handleSubmit}>
				<p>Client ID:</p>
				<input type="text" size="100" value={this.state.clientId} onChange={evt => this.updateClientId(evt)} />
				<p>Scopes:</p>
				<textarea name="w3review" rows="4" cols="100" value={this.state.scopes} onChange={this.updateScopes} />
				<p>
					<input type="submit" value="Start" />
				</p>
				
			</form>
		</div>
		;
  }
	
	updateClientId(evt) {
		this.setState({
			clientId: evt.target.value
		});
	}
	
	updateScopes(evt) {
		this.setState({
			scopes: evt.target.value
		});
	}
}

function _baseUrl() {
  return window.location.href.replace(/\/\?.*/g, '');
}

export default Init;
