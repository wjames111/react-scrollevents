import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

class ScrollEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allTriggerElements: [],
      triggersPlaystate: [],
      indicatorPosition: '50%',
      scrollingContainer: 'body',
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.checkTriggers = this.checkTriggers.bind(this);

    //  adds reference for removing listener, applies debounce from props
    this.debounceScroll = props.isDebounce
      ? debounce(this.handleScroll, props.debounceAmount, {
        trailing: true,
        leading: true,
      })
      : this.handleScroll;
  }

  componentDidMount() {
    const { triggerElements, scrollContainer, indicatorPlacement } = this.props;

    //  finds location of indicator relative to viewport
    const calcIndicatorPosition = (parseInt(indicatorPlacement, 10) / 100) * window.innerHeight;
    const getSelector = (element) => document.querySelector(element);

    //  allows props to be a selector or ref
    const checkTypeOfSelector = (element) => {
      if (typeof element === 'string') {
        return getSelector(element);
      }

      return element;
    };

    //  map a single trigger or multiple triggers with same function
    const makeElementsArray = Array.isArray(triggerElements) ? triggerElements : [triggerElements];

    const getScrollContainer = scrollContainer.current ? scrollContainer.current
      : checkTypeOfSelector(scrollContainer);

    const initTriggerPlaystate = [];

    const getTriggerElements = makeElementsArray.map((element) => {
      //  keeps reference for triggered elements
      initTriggerPlaystate.push(false);
      return checkTypeOfSelector(element);
    });

    this.setState({
      allTriggerElements: getTriggerElements,
      triggersPlaystate: initTriggerPlaystate,
      indicatorPosition: calcIndicatorPosition,
      scrollingContainer: getScrollContainer,
    });

    getScrollContainer.addEventListener('scroll', this.debounceScroll, true);
  }

  componentWillUnmount() {
    const { scrollingContainer } = this.state;
    scrollingContainer.removeEventListener('scroll', this.debounceScroll, true);
  }

  checkTriggers(elemIdx, scrollPosition) {
    const { allTriggerElements, triggersPlaystate } = this.state;
    const { isReplayable, onScrollYCallback } = this.props;
    const element = allTriggerElements[elemIdx].current || allTriggerElements[elemIdx];
    const elementHeight = element.offsetHeight;
    const elementTop = element.getBoundingClientRect().top;

    //  get percentage of trigger element scrolled
    const progress = ((scrollPosition - elementTop) / elementHeight) * 100;

    const updatetriggersPlaystate = (value) => {
      const newPlaystate = Object.assign([], triggersPlaystate, {
        [elemIdx]: value,
      });

      this.setState({
        triggersPlaystate: newPlaystate,
      });
    };

    //  notifies parent component of triggered events
    const sendCallBack = (triggeredAction) => {
      const calbck = onScrollYCallback;
      let setCalbck;

      switch (triggeredAction) {
        case 'start':
          setCalbck = calbck.start;
          break;
        case 'progress':
          setCalbck = calbck.progress;
          break;
        case 'end':
          setCalbck = calbck.end;
          break;
        default:
          setCalbck = null;
          break;
      }

      (() => (typeof onScrollYCallback === 'function' ? onScrollYCallback(elemIdx, triggeredAction, progress)

      //  && avoids error if undefined callback invoked
        : setCalbck && setCalbck(element, progress)))();
    };

    const updateTriggered = (triggeredAction, playState) => {
      sendCallBack(triggeredAction);
      updatetriggersPlaystate(playState);
    };

    if (progress >= 0 && progress <= 100 && triggersPlaystate[elemIdx] !== null) {
      if (triggersPlaystate[elemIdx] === false) {
        updateTriggered('start', true);
      }

      sendCallBack('progress');
    } else if (triggersPlaystate[elemIdx]) {
      // updateTriggered('end', false);
      sendCallBack('end');

      // adds null for elements already animated but not replayable
      const played = isReplayable ? false : null;
      updatetriggersPlaystate(played);
    }
  }

  handleScroll() {
    const { allTriggerElements, indicatorPosition, scrollingContainer } = this.state;
    const triggersAmnt = allTriggerElements.length;

    if (!triggersAmnt) {
      //  once all elements removed (line 131) kill listener
      scrollingContainer.removeEventListener('scroll', this.debounceScroll, true);
    }

    const scrollPosition = indicatorPosition + scrollingContainer.scrollTop;

    for (let elemIdx = 0; elemIdx < triggersAmnt; elemIdx += 1) {
      this.checkTriggers(elemIdx, scrollPosition);
    }
  }

  render() {
    const {
      indicatorPlacement, isIndicator, customComponent, indicatorStyles,
    } = this.props;

    const trigger = {
      position: 'fixed',
      height: '3px',
      width: '10vw',
      backgroundColor: 'green',
      top: `${parseInt(indicatorPlacement, 10)}vh`,
      right: 0,
      zIndex: 100,

      //  custom styles here + will overide
      ...indicatorStyles,
    };

    return (
      <div
        className="indicator"

        // remove styles for nested components
        style={!customComponent && isIndicator ? trigger : {}}
      >
        {customComponent}
      </div>
    );
  }
}

ScrollEvents.defaultProps = {
  scrollContainer: 'body',
  indicatorPlacement: '50vh',
  isIndicator: true,
  isReplayable: true,
  debounceAmount: 15,
  customComponent: null,
  indicatorStyles: {},
  isDebounce: false,
};

ScrollEvents.propTypes = {
  scrollContainer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  indicatorPlacement: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isIndicator: PropTypes.bool,
  isReplayable: PropTypes.bool,
  debounceAmount: PropTypes.number,
  triggerElements: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  onScrollYCallback: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.func), PropTypes
    .func]).isRequired,
  customComponent: PropTypes.element,
  indicatorStyles: PropTypes.objectOf(PropTypes.string),
  isDebounce: PropTypes.bool,
};

export default ScrollEvents;
