import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Scro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allElements: [],
      isAnimationDone: [],
      initAnim: false,
      isAnimationPlaying: [],
      direction: null,
      prevProgress: null,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.setAnimState = this.setAnimState.bind(this);
    this.initAnimation = this.initAnimation.bind(this);
  }

  componentDidMount() {
    const { triggerElements } = this.props;
    let isTriggerElementAnimated = [];
    let isAnimationPlayingArr = [];
    const selector = (element) => document.querySelector(element);
    let getTriggerElements = triggerElements.map((element) => {
      isTriggerElementAnimated.push(false);
      isAnimationPlayingArr.push(false);
      return selector(element);
    });

    this.setState({
      allElements: getTriggerElements,
      isAnimationDone: isTriggerElementAnimated,
      isAnimationPlaying: isAnimationPlayingArr,
    });

    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }

  setAnimState(element, value) {
    const { isAnimationDone } = this.state;
    let finishedAnimations = Object.assign([], isAnimationDone, {
      [element]: value,
    });

    this.setState({
      isAnimationDone: finishedAnimations,
    });
  }

  initAnimation(allElements, elem, currentScrollPosition) {
    let elementTop = allElements[elem].getBoundingClientRect().top;
    const elementHeight = allElements[elem].offsetHeight;
    let progress = ((currentScrollPosition - elementTop) / elementHeight) * 100;

    if (progress >= 0 && progress <= 100) {
      if (!this.state.isAnimationPlaying[elem]) {
        // alert("start");

        // onScrollYCallback.start(element)
        let isAnimationPlayingArr = Object.assign(
          [],
          this.state.isAnimationPlaying,
          {
            [elem]: true,
          }
        );

        this.setState({
          isAnimationPlaying: isAnimationPlayingArr,
          prevProgress: progress,
        });
      }
      // this.props.onScrollYCallback.animation(element, progress)
    } else if (this.state.isAnimationPlaying[elem]) {
      alert("end");
      // onScrollYCallback.end(element)
      let isAnimationPlayingArr = Object.assign(
        [],
        this.state.isAnimationPlaying,
        { [elem]: false }
      );

      this.setState({
        isAnimationPlaying: isAnimationPlayingArr,
        prevProgress: progress,
      });

      if (!this.props.isReplayable) {
        this.setAnimState(elem, true);
      } else {
        this.setAnimState(elem, false);
      }
    } else {
      this.setAnimState(elem, false);
    }
    console.log(this.state.isAnimationDone);
  }

  handleScroll() {
    const {
      triggerPlacement,
      scrollContainer,
      onScrollYCallback,
      isReplayable,
    } = this.props;

    let { allElements, isAnimationDone } = this.state;

    let triggerPosition = parseInt(triggerPlacement) / 100;
    let amountScrolled = document.querySelector(scrollContainer).scrollTop;
    let currentScrollPosition =
      window.innerHeight * triggerPosition + amountScrolled;

    for (let element in allElements) {
      if (!isAnimationDone[element]) {
        this.initAnimation(allElements, [element], currentScrollPosition);
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
        ref={this.indicator}
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
