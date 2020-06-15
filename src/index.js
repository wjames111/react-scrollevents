import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

class Scro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allElements: [],
      isAnimationPlaying: [],
      debounceAmount: 15,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.initAnimation = this.initAnimation.bind(this);
    this.throttledScroll = debounce(
      this.handleScroll,
      this.state.debounceAmount,
      {
        trailing: true,
        leading: true,
      }
    );
  }

  componentDidMount() {
    const { triggerElements, scrollContainer, triggerPlacement } = this.props;
    const triggerElementsType = Array.isArray(triggerElements)
      ? triggerElements
      : [triggerElements];
    let initAnimPlaystate = [];
    let getTriggerPosition =
      (parseInt(triggerPlacement) / 100) * window.innerHeight;
    const selector = (element) => document.querySelector(element);

    let getScrollContainer =
      typeof scrollContainer === "string"
        ? selector(scrollContainer)
        : scrollContainer.current;

    let getTriggerElements = triggerElementsType.map((element) => {
      initAnimPlaystate.push(false);
      if (typeof element === "string") {
        return selector(element);
      } else {
        return element.current;
      }
    });

    this.setState({
      allElements: getTriggerElements,
      isAnimationPlaying: initAnimPlaystate,
      triggerPosition: getTriggerPosition,
      setScrollContainer: getScrollContainer,
    });

    window.addEventListener("scroll", this.throttledScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.throttledScroll);
  }

  initAnimation(element, elemIdx, currentScrollPosition) {
    const { allElements, isAnimationPlaying } = this.state;
    const { isReplayable, onScrollYCallback } = this.props;
    let elementHeight = element.offsetHeight;
    let elementTop = element.getBoundingClientRect().top;
    let progress = ((currentScrollPosition - elementTop) / elementHeight) * 100;

    if (progress >= 0 && progress <= 100) {
      if (!isAnimationPlaying[elemIdx]) {
        onScrollYCallback.start &&
          onScrollYCallback.start(allElements[elemIdx], progress);

        let isAnimationPlayingArr = Object.assign([], isAnimationPlaying, {
          [elemIdx]: true,
        });

        this.setState({
          isAnimationPlaying: isAnimationPlayingArr,
        });
      }
      onScrollYCallback.progress &&
        onScrollYCallback.progress(allElements[elemIdx], progress);
    } else if (isAnimationPlaying[elemIdx]) {
      onScrollYCallback.end && onScrollYCallback.end(allElements[elemIdx]);
      let isAnimationPlayingArr = Object.assign([], isAnimationPlaying, {
        [elemIdx]: false,
      });

      this.setState({
        isAnimationPlaying: isAnimationPlayingArr,
      });

      if (!isReplayable) {
        let allElementsImu = [...allElements];
        let rmElement = allElementsImu.splice(elemIdx, 1);
        this.setState({
          allElements: allElementsImu,
        });
      }
    }
  }

  handleScroll() {
    let {
      allElements,
      isAnimationDone,
      triggerPosition,
      setScrollContainer,
    } = this.state;

    if (!allElements.length) {
      window.removeEventListener("scroll", this.throttledScroll);
    }

    let currentScrollPosition = triggerPosition + setScrollContainer.scrollTop;

    for (let element in allElements) {
      if (allElements[element]) {
        this.initAnimation(
          allElements[element],
          [element],
          currentScrollPosition
        );
      }
    }
  }

  render() {
    const { triggerPlacement, isIndicator } = this.props;

    this.styles = {
      trigger: {
        position: "fixed",
        height: "3px",
        width: "10vw",
        backgroundColor: "green",
        top: triggerPlacement,
        right: 0,
        pointer: 0,
        zIndex: 800,
      },
    };

    return (
      <div
        className="indicator"
        style={isIndicator ? this.styles.trigger : {}}
      ></div>
    );
  }
}

Scro.defaultProps = {
  scrollContainer: "body",
  triggerPlacement: "50vh",
  isIndicator: true,
  isReplayable: false,
  debounce: 15,
};

Scro.propTypes = {
  scrollContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  triggerPlacement: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isIndicator: PropTypes.bool,
  isReplayable: PropTypes.bool,
  debounce: PropTypes.number,
  triggerElements: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
  onScrollYCallback: PropTypes.object.isRequired,
};

export default Scro;
