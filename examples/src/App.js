import React, { Component } from 'react';
import './App.css';
import ScrollEvents from './react-scrollevents';
import bell from './bell.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageData: [['messageOne', { opacity: 0, transform: 'scale(1)' }, 'Lorem ipsum aute officia ut aute ut dolor exercitation tempor pariatur nisi sit.'], ['messageTwo', { opacity: 0, transform: 'scale(1)' }, 'Exercitation et quis ea fugiat voluptate sit occaecat sint dolor.'], ['messageThree', { opacity: 0, transform: 'scale(1)' }, 'Voluptate magna proident aliqua cupidatat fugiat cillum sint reprehenderit.'], ['messageFour', { opacity: 0, transform: 'scale(1)' }, 'Veniam culpa nisi occaecat ut ex in adipisicing nulla aute consequat.'], ['messageFive', { opacity: 0, transform: 'scale(1)' }, 'Lorem ipsum in nostrud proident consequat est ea minim amet nostrud.'], ['messageSix', { opacity: 0, transform: 'scale(1)' }, 'Lorem ipsum dolor est excepteur sint eiusmod proident cillum mollit nisi enim ut consectetur officia excepteur consequat.'], ['messageSeven', { opacity: 0, transform: 'scale(1)' }, 'Ad laboris commodo non ad aliquip id fugiat dolor do in consectetur in ea deserunt incididunt reprehenderit.']],
      messageAlerts: 0,
      notifyAlert: { color: '#b5b9c1', transform: 'scale(1)' },
    };

    this.scrollContainer = React.createRef();

    this.state.messageData.forEach((message) => {
      this[`messageRef${message[0]}`] = React.createRef();
    });

    this.onScrollY = this.onScrollY.bind(this);
  }

  onScrollY(elemInx, action, progress) {
    const { messageData, messageAlerts } = this.state;

    const animateProgress = (num) => {
      const endValue = parseInt(num, 10);
      const progressRounded = Math.round(progress);
      const frameAmount = (endValue / 100) * progressRounded;
      return frameAmount;
    };

    const opacAnim = animateProgress(1);
    const scaleAnim = animateProgress(1.75);
    const scaleTransition = progress < 50 ? 1 - (scaleAnim / 10) : 1 + (scaleAnim / 10);
    const scaleTransCSS = `scale(${scaleTransition})`;
    const getMessages = [...messageData];
    getMessages[elemInx][1] = { opacity: opacAnim, transform: scaleTransCSS };

    const checkAlert = () => {
      if (action === 'end') {
        if (progress > 90) {
          return 1;
        }

        if (messageAlerts) {
          return -1;
        }

        return 0;
      }

      return 0;
    };

    const newAlerts = checkAlert();
    const updatedAlerts = messageAlerts + newAlerts;
    const alertSize = updatedAlerts > messageAlerts ? { transform: 'scale(1.2)' } : { transform: 'scale(1)' };
    const alertColor = updatedAlerts > 0 ? { color: 'red' } : { color: '#b5b9c1' };
    const alertStyle = { ...alertSize, ...alertColor };

    this.setState({
      messageData: getMessages,
      messageAlerts: updatedAlerts,
      notifyAlert: alertStyle,
    });
  }

  render() {
    const { messageData, messageAlerts, notifyAlert } = this.state;
    return (
      <div>
        <div ref={this.scrollContainer} className="app">
          <div className="app-container">
            <div className="app-nav">
              <img alt="notification bell" className="app-nav-bell" src={bell} />
              <span className="app-nav-header">notifications</span>
              <span className="app-nav-list" style={notifyAlert}>{messageAlerts}</span>
            </div>
            {
              messageData.map((message) => <div key={message[0]} ref={this[`messageRef${message[0]}`]} style={message[1]} className="messages">{message[2]}</div>)
            }
          </div>
        </div>
        <ScrollEvents
          triggerElements={messageData.map((message) => this[`messageRef${message[0]}`])}
          onScrollYCallback={this.onScrollY}
          scrollContainer={this.scrollContainer}
          isIndicator
          indicatorPlacement="70vh"
          indicatorStyles={{ height: '1vh', backgroundColor: 'blue' }}
          isReplayable
          isDebounce={false}
          debounceAmount
          customComponent={null}
        />
      </div>
    );
  }
}

export default App;
