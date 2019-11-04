import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import { Helmet } from 'react-helmet';
import './../css/login/login.css';
import SignUpForm from './SignUpForm';
import Cookie from '../Utility/Cookie';
import TwoFactor from './TwoFactor';
import logo from './../images/HC.svg';

export default class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', signin: true, twofactor: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.swapForm = this.swapForm.bind(this);
    this.callback = this.callback.bind(this);
    this.setCaptcha = this.setCaptcha.bind(this);
    this.captcha = '';
  }

  handleChange(event) {
    this.setState({
      email: document.getElementById('login_email').value,
      password: document.getElementById('login_password').value
      //captcha: document.getElementById("login_captcha").value
    });
  }

  handleSubmit(event) {
    console.log(this.captcha);
    event.preventDefault();
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        captcha: this.captcha
      })
    };

    fetch('http://localhost:8080/users/login', options)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        } else {
          console.log('failed');
          return null;
        }
      })
      .then(result => {
        if (result === null) {
        } else {
          //add cookie
          var date = new Date();
          date = new Date(date.getTime() + 60 * 60 * 1000);
          Cookie.setCookie('HC_JWT', result.token, date);
          //redirect to 2factor
          this.setState({ twofactor: true });
        }
      });
  }

  swapForm() {
    this.setState({
      email: this.state.email,
      password: this.state.password,
      signin: false
    });
  }

  callback = function() {
    console.log('Done!!!!');
  };

  // specifying verify callback function
  setCaptcha(response) {
    console.log(response);
    this.captcha = response;
  }

  render() {
    if (this.state.twofactor) {
      console.log('here');
      return <TwoFactor email={this.state.email}></TwoFactor>;
    } else if (this.state.signin) {
      return (
        <form id='SignInForm' className='formBox' onSubmit={this.handleSubmit}>
          {' '}
          <br />
          <span>
            {' '}
            <img src={logo} alt=''></img> <h4>Log In to Hoosier Connection</h4>{' '}
          </span>
          <br />
          <Helmet>
            <script src='https://www.google.com/recaptcha/api.js'>aha</script>
          </Helmet>
          <div className='label'>
            <label>Email:</label>
            <br />
          </div>
          <input
            type='text'
            id='login_email'
            onChange={this.handleChange}
            placeholder='Ex. you@gmail.com'
            required
          ></input>
          <br />
          <div className='label'>
            <label>Password:</label>
            <br />
          </div>
          <input
            type='password'
            onChange={this.handleChange}
            id='login_password'
            required
          ></input>
          <br />
          <div className='google-cap'>
            <Recaptcha
              sitekey='6LeACsAUAAAAAPfVJZqfoO7qLeefTB5qlcjHuOQE'
              render='explicit'
              verifyCallback={this.setCaptcha}
              onloadCallback={this.callback}
            />
          </div>
          <span>
            <input type='submit' className='button' value='Login' />
            <p onClick={this.swapForm}>Sign up</p>
            <br />
            <a href='SendResetEmail'>Forgot Password?</a>
          </span>
        </form>
      );
    } else {
      console.log('here2');
      return <SignUpForm />;
    }
  }
}
