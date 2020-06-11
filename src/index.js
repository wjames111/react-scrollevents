import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class ScrollY extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elements: [],
      isAnimated: [],
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.setAnimState = this.setAnimState.bind(this);
    this.initAnimation = this.initAnimation.bind(this);
  }

  componentDidMount() {
    const { triggerElements } = this.props;
    let isTriggerElementAnimated = [];
    const selector = (elements) => document.querySelector(elements);
    let getTriggerElements = triggerElements.map((elements) => {
      isTriggerElementAnimated.push(false);
      return selector(elements);
    });

    this.setState({
      elements: getTriggerElements,
      isAnimated: isTriggerElementAnimated,
    });

    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }

  setAnimState(element, value) {
    const { isAnimated } = this.state;
    let finishedAnimations = Object.assign([], isAnimated, {
      [element]: value,
    });

    this.setState({
      isAnimated: finishedAnimations,
    });
  }

  handleScroll(e) {
    const {
      triggerPos,
      scrollContainer,
      scrollYCallback,
      replayable,
    } = this.props;
    let { elements, isAnimated } = this.state;

    let triggerPosition = parseInt(triggerPos) / 100;
    let scrolledContainer = document.querySelector(scrollContainer).scrollTop;
    let currentPosition =
      window.innerHeight * triggerPosition + scrolledContainer;

    for (let vari in elements) {
      let elementTop = elements[vari].getBoundingClientRect().top;
      let elementHeight = elements[vari].offsetHeight;
      console.log("element: " + elementTop, "body: " + currentPosition);
      console.log(isAnimated);
      if (
        currentPosition >= elementTop &&
        currentPosition <= elementTop + elementHeight &&
        !isAnimated[vari]
      ) {
        this.initAnimation([vari]);
        let x = ((currentPosition - elementTop) / elementHeight) * 100;
        console.log("percentage: " + x);
      }

      else if (
        currentPosition > elementTop + elementHeight &&
        isAnimated[vari] &&
        scrollboth
      ) {
        this.setAnimState(vari, false);
      }
    }
  }



 class initAnimation extends Component {
    constructor(props) {
      super(props)
      this.state = {
        prevProgress: null;
        playState: null
      }
    }
componentDidMount() {
  scrollYCallback(vari);
  this.startAnim()

}
/// anim progress can go either way
startAnim() {
let animProgress = ((currentPosition - elementTop) / elementHeight) * 100;

while (animProgress > 0 && animProgress < 99) {
if (animProgress > prevProgress && forward) {

  this.setState({
    prevProgress: animProgress,
    playState: playing
  })

} else if (animProgress < prevProgress && backward) {

  this.setState({
    prevProgress: animProgress,
    playState: playing
  })

} else {

    this.setState({
    prevProgress: animProgress,
    playState: finished
  })
   this.setAnimState(vari, true);
  }
}
}

}





  render() {
    const { triggerPos, showPointer } = this.props;
    this.styles = {
      trigger: {
        position: "fixed",
        height: "3px",
        width: "10vw",
        backgroundColor: "green",
        top: triggerPos,
        right: 0,
        pointer: 0,
        zIndex: 800,
      },
    };

    return (
      <div
        ref={this.pointer}
        className="pointer"
        style={showPointer ? this.styles.trigger : {}}
      ></div>
    );
  }
}

ScrollY.defaultProps = {
  scrollContainer: ".App",
  triggerPos: "50%",
  showPointer: true,
  replayable: false,
};

ScrollY.propTypes = {
  triggerElements: PropTypes.array.isRequired,
  scrollYCallback: PropTypes.func.isRequired,
  triggerPos: PropTypes.string,
  replayable: PropTypes.bool,
  showPointer: PropTypes.bool,
  scrollContainer: PropTypes.string,
};

export default ScrollY;
