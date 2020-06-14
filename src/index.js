import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Scro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allElements: [],
      isAnimationPlaying: [],
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.initAnimation = this.initAnimation.bind(this);
  }

  componentDidMount() {
    const { triggerElements } = this.props;
    const triggerElementsType = Array.isArray(triggerElements)
      ? triggerElements
      : [triggerElements];
    let initAnimPlaystate = [];
    const selector = (element) => document.querySelector(element);

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
    });

    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }

  initAnimation(elem, currentScrollPosition) {
    const { allElements, isAnimationPlaying } = this.state;
    const { isReplayable } = this.props;
    let elementTop = allElements[elem].getBoundingClientRect().top;
    let elementHeight = allElements[elem].offsetHeight;
    let progress = ((currentScrollPosition - elementTop) / elementHeight) * 100;

    if (progress >= 0 && progress <= 100) {
      if (!isAnimationPlaying[elem]) {
        alert("start");
        // onScrollYCallback.start(element)
        let isAnimationPlayingArr = Object.assign([], isAnimationPlaying, {
          [elem]: true,
        });

        this.setState({
          isAnimationPlaying: isAnimationPlayingArr,
        });
      }
      // this.props.onScrollYCallback.animation(element, progress)
    } else if (isAnimationPlaying[elem]) {
      alert("end");
      // onScrollYCallback.end(element)
      let isAnimationPlayingArr = Object.assign([], isAnimationPlaying, {
        [elem]: false,
      });

      this.setState({
        isAnimationPlaying: isAnimationPlayingArr,
      });

      if (!isReplayable) {
        let allElementsImu = [...allElements];
        let rmElement = allElementsImu.splice(elem, 1);
        this.setState({
          allElements: allElementsImu,
        });
      }
    }
    console.log(allElements);
  }

  handleScroll() {
    const { triggerPlacement, scrollContainer } = this.props;
    let { allElements, isAnimationDone } = this.state;

    let triggerPosition = parseInt(triggerPlacement) / 100;
    let amountScrolled = document.querySelector(scrollContainer).scrollTop;
    let currentScrollPosition =
      window.innerHeight * triggerPosition + amountScrolled;

    for (let element in allElements) {
      if (this.state.allElements[element]) {
        this.initAnimation([element], currentScrollPosition);
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
        // ref={this.indicator}
        className="indicator"
        style={isIndicator ? this.styles.trigger : {}}
      ></div>
    );
  }
}

Scro.defaultProps = {
  scrollContainer: "body",
  triggerPlacement: "50%",
  isIndicator: true,
  isReplayable: true,
};

Scro.propTypes = {
  scrollContainer: PropTypes.string,
  triggerPlacement: PropTypes.string,
  isIndicator: PropTypes.bool,
  isReplayable: PropTypes.bool,
  triggerElements: PropTypes.array.isRequired,
  onScrollYCallback: PropTypes.func.isRequired,
};

export default Scro;
