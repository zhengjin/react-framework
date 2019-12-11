/* eslint-disable no-undef */
import React,{Component} from 'react';

import FastClick from 'fastclick';
import logo from './logo.svg';
import './App.css';

import {isTesting} from './utils/Utils';
import * as Sentry from '@sentry/browser';
import log from './bury/index'

window.logger = new log({
    mode:window.PAGE_CONFIG.env
})

// @logger.catchClass
class App extends Component{
    constructor(props) {
        super(props);

        this.methodDoesNotExist = this.methodDoesNotExist.bind(this);

        this.state = { eventId: null };
    }
    componentWillMount() {
      if(!isTesting()){
          FastClick.attach(document.body);
      }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({eventId});
        });
    }

    @logger.trackAction('test user action collection')
    methodDoesNotExist(){
        // Sentry.captureException(new Error("Something broke"));
        throw new Error("Something broke")
      return 1/0;
    }
  render() {
    return (
        <div className="App">
            <button onClick={this.methodDoesNotExist}>Break the world</button>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
  }
}


export default App;
