import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  // Google provided script. Searches App.js for "g-signin2"
  insertGapiScript() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js?onload=onLibraryLoaded';
    script.onload = () => {
      this.initializeGoogleSignIn();
    }
    document.body.appendChild(script);
  }

  initializeGoogleSignIn() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '677743551003-7as90p5tac463uoeacfp272cu43dqhs2.apps.googleusercontent.com' // Unique credentials provided by Google APIs
      })
      console.log('Api inited');

      window.gapi.load('signin2', () => {
        const params = {
          // Inited when Google sign in onsuccess is true
          onsuccess: (googleUser) => {
            var profile = googleUser.getBasicProfile();
            var profileImg = document.createElement('img');
            profileImg.src = profile.getImageUrl();
            document.body.appendChild(profileImg);
            var welcomeMessage = document.createElement('p');
            welcomeMessage.textContent = 'Welcome, ' + profile.getName() + '. Your email address is: ' + profile.getEmail();
            document.body.appendChild(welcomeMessage);
          }
        }
        window.gapi.signin2.render('loginButton', params);
      })
    })
  }

  componentDidMount() {
    console.log('Loading');
    this.insertGapiScript();
  }
 
  // Create and stylize Google sign in button
  render() {
    return (
      <div className="App">
        <h1>Google Login Demo</h1>
        <div id="loginButton" className="g-signin2" data-onsuccess="onSignIn">Sign in with Google</div>
      </div>
    );
  }
}

export default App;
