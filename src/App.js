import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LCC from 'lightning-container';
require("../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css");

class App extends Component {

  constructor(props) {
    super(props);  
    this.state = {
      messageReceived: {
        type: 'default',
        value: 'Message will appear here'
      },
      messageToSend: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.callApexController = this.callApexController.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleApexReturnValue = this.handleApexReturnValue.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    LCC.addMessageHandler(this.handleMessage);
    LCC.addErrorHandler(this.handleError);
  }

  sendMessage() {
    LCC.sendMessage({ name: "MyMessage", value: this.state.messageToSend });    
  }

  handleInputChange(event) {
    var message = event.target.value;
    this.setState({
     messageToSend: message
    });
  }

  handleMessage(successMessage) {
    var messageReceived = {
      type: 'success',
      value: successMessage
    };
    this.setState({
      messageReceived: messageReceived
    });
  }

  handleError(errorMessage) {
    var messageReceived = {
      type: 'error',
      value: errorMessage
    };
    this.setState({
      messageReceived: messageReceived
    });
  }

  callApexController(event) {
    event.preventDefault();
    LCC.callApex(
      "LightningContainerBoilerplate.createNewContact",
      this.state.messageToSend,
      this.handleApexReturnValue,
      {escape: true});
  }

  handleApexReturnValue(result, event) {
    var messageReceived;
    if(event.status) {
      messageReceived = {
        type: 'apexsuccess',
        value: result
      };
    } else if(event.type === 'exception') {
      messageReceived = {
        type: 'apexerror',
        value: event.message + ' ' + event.where
      };
    } else {
      messageReceived = {
        type: 'apexerror',
        value: event.message
      };
    }
    this.setState({
      messageReceived: messageReceived
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lightning Container Component Boilerplate with React</h1>
        </header>
        <br />
          <div className="App-intro slds-form-element">
            <form onSubmit={this.callApexController}>
            <div className="slds-grid slds-wrap">
              <div className="slds-col slds-size_1-of-3 slds-p-horizontal_medium">
                <label className="slds-form-element__label" htmlFor="name">Type Last Name of Contact or Message:</label>
                <div className="slds-form-element__control">
                  <input id="name" className="slds-input" type="text" value={this.state.messageToSend} onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="slds-col slds-size_1-of-3">
                <br />
                <button type="button" className="slds-button slds-button_brand" onClick={this.sendMessage}>Send Message</button>
              </div>
              <div className="slds-col slds-size_1-of-3">
                <br />
                <input type="submit" className="slds-button slds-button_brand" value="Save Contact" />
              </div>
            </div>
            </form>
            <div className="slds-grid slds-wrap">
              <div className="slds-size_1-of-2 slds-text-heading_large">
              <br />
                { this.state.messageReceived.type === 'success' && (
                      <div> Success :- </div>
                )}
                { this.state.messageReceived.type === 'error' && (
                      <div> Error :- </div>
                )}
                { this.state.messageReceived.type === 'apexsuccess' && (
                      <div> Apex Success :- </div>
                )}
                { this.state.messageReceived.type === 'apexerror' && (
                      <div> Apex Error :- </div>
                )}
                { this.state.messageReceived.type === 'default' && (
                      <div> Default Message :- </div>
                )}
              </div>
              <div className="slds-size_1-of-2 slds-text-heading_large">
              <br />
                   {this.state.messageReceived.value}
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
