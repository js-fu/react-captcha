import React, { Component } from 'react';
import { render } from 'react-dom';
import Captcha from './Captcha';
import './style.css';

interface AppProps { }
interface AppState {
  captcha: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      captcha: '0000'
    };
  }

  changeCaptcha = () => {
    const captcha = '0000' + Math.random() * 10000;

    this.setState({
      captcha: captcha.slice(-4),
    });
  }

  render() {
    return (
      <div>
        <Captcha
          text={this.state.captcha}
          onClick={this.changeCaptcha}
        />
        <p>点击验证码刷新</p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
