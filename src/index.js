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
      triggerPosition: "",
      setScrollContainer: "",
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.initAnimation = this.initAnimation.bind(this);

    this.throttledScroll = debounce(
      this.handleScroll,
      this.props.debounceAmount,
      {
        trailing: true,
        leading: true,
      }
    );
  }

  componentDidMount() {
    const { triggerElements, scrollContainer, triggerPlacement } = this.props;

    let getTriggerPosition =
      (parseInt(triggerPlacement) / 100) * window.innerHeight;

    const selector = (element) => document.querySelector(element);

    let typeOfSelector = (element) => {
      if (typeof element === "string") {
        return selector(element);
      } else {
        return element.current;
      }
    };

    const triggerElementsType = Array.isArray(triggerElements)
      ? triggerElements
      : [triggerElements];

    let getScrollContainer = typeOfSelector(scrollContainer);

    let initAnimPlaystate = [];
    let getTriggerElements = triggerElementsType.map((element) => {
      initAnimPlaystate.push(false);
      return typeOfSelector(element);
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

    let setAnimationPlayingArr = (value) => {
      let isAnimPlayingArr = Object.assign([], isAnimationPlaying, {
        [elemIdx]: value,
      });
      this.setState({
        isAnimationPlaying: isAnimPlayingArr,
      });
    };

    let setCallBack = (scrollState) => {
      const clb = onScrollYCallback;
      let clbck;
      switch (scrollState) {
        case "start":
          clbck = clb.start;
          break;
        case "progress":
          clbck = clb.progress;
          break;
        case "end":
          clbck = clb.end;
          break;
      }
      clbck && clbck(element, progress);
    };

    if (progress >= 0 && progress <= 100) {
      if (!isAnimationPlaying[elemIdx]) {
        setCallBack("start");
        setAnimationPlayingArr(true);
      }
      setCallBack("progress");
    } else if (isAnimationPlaying[elemIdx]) {
      setCallBack("end");
      setAnimationPlayingArr(false);

      if (!isReplayable) {
        let allElementsImu = [...allElements];
        allElementsImu.splice(elemIdx, 1);
        this.setState({
          allElements: allElementsImu,
        });
      }
    }
  }

  handleScroll() {
    const { allElements, triggerPosition, setScrollContainer } = this.state;

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
  debounceAmount: 15,
};

Scro.propTypes = {
  scrollContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  triggerPlacement: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isIndicator: PropTypes.bool,
  isReplayable: PropTypes.bool,
  debounceAmount: PropTypes.number,
  triggerElements: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
  onScrollYCallback: PropTypes.object.isRequired,
};

export default Scro;
