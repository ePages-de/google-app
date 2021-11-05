import Homepage from './views/Homepage';
import Redirect from './views/Redirect';
import './App.css';

function App() {
  if (_isRequestComingFromAuthorizationServer()) {
    return (
      <div className="App">
        <Redirect />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Homepage />
      </div>
    );
  }
}

function _isRequestComingFromAuthorizationServer() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const authorizationCode = urlParams.get("code");
  
  return authorizationCode != null;
}

export default App;
