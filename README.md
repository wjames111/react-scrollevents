# react-scrollevents

> React component for adding scroll events

# About
The react-scrollevents package is a useful react component for any project requiring scroll interaction in its UI. Whether that be an animation triggered once scrolled to, infinite scroller, or scroll scrubbing, this component should make your job a lot easier. The component returns a handy callback allowing you to write your own scroll interactions without having to set it up yourself. 

After implementing something similar in several other projects I figured it was time to set up a well-documented reusable component without any extra unneeded functionality. There are several great projects already available for this kind of thing including react-scrollmagic. 

However, if you're looking for bare bones functionality or are not using the GSAP animation library react-scrollevents is a great option.
If you simply need functionality for an infinite scroller, using IntersectionObserver may be a more performant option. Phong Lam gives a great overview of IntersectionObserver in his medium article [Infinite Scroll’ing the right way](https://medium.com/walmartlabs/infinite-scrolling-the-right-way-11b098a08815).

Live demo:

https://wjames111.github.io/react-scrollevents/

Demo source:

https://github.com/wjames111/react-scrollevents/tree/master/examples

# Adding react-scrollevents

#### 1. cd into your project and run

```bash
npm install --save react-scrollevents
```

#### 1. import react-scrollevents component into a class component

```jsx
import React, { Component } from 'react'
import ScrollEvents from 'react-scrollevents';


class App extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div>
        <ScrollEvents />
      </div>
      )
  }
}
```

#### 1. scrollEvents requires two parameters, a triggerElements prop and a onScrollYCallback prop.

* triggerElements takes in a react ref, if multiple elements will be triggered please pass the refs into an array. While not advised, triggerElements will also take a className or id selector as a string.

* onScrollYCallback requires a callback function that will be called during each trigger. This callback should accept three arguments, the index of the element triggered, the action (start or end), and the element's scroll progress.


```jsx
import React, { Component } from 'react'
import ScrollEvents from 'react-scrollevents';


class App extends Component {
  constructor(props) {
    super(props);

    this.triggerOne = React.createRef();
    this.triggerTwo = React.createRef();
  }

  onScrollY(element, action, progress) {
    // trigger whatever action or animation here
    if (action == 'start' || action == 'end') {
      console.log(element + ' ' + action);
    } else {
      console.log(`${element} has been scrolled ${progress} percent`);
    }
  }
  }

  render() {
    return (
      <div>
        <div ref={this.triggerOne}>
        </div>
        <div ref={this.triggerTwo}>
        </div>
        <ScrollEvents
          triggerElements={[this.triggerOne, this.triggerTwo]}
          onScrollYCallback={this.onScrollY}
          />
      </div>
      )
  }
}
```

# Additional Props
name | type | optional | default
--- | --- | --- | --- 
triggerElements | array, react ref or string | no | required
onScrollYCallback | function | no | required
scrollContainer | react ref element or string | yes | window
isIndicator | boolean | yes | true
indicatorPlacement | string or number | yes | 50%
indicatorStyles | object | yes | {}
isReplayable | boolean | yes | true
isDebounce | boolean | yes | false
debounceAmount | number | yes | 15ms
customComponent | react component | yes | null


## Optional Props Explained
* scrollContainer is the element the event listener is attached to. By default, it's this will be the window object.

* isIndicator, if set to true adds a pointer for debugging purposes. The default, is set to true.

* indicatorPlacement defines where in the scrollContainer elements should be triggered.

* indicatorStyles allows you to redefine what the pointer looks like. Useful for creating a custom sticky component.

* isReplayable allows elements to be triggered more than once.

* isDebounce determines if scroll event should use debounce.

* debounceAmount will determine the length of the debounce in ms.

* customComponent allows child components to be added inside the scrollEvents component.


## License

MIT © [2020](https://github.com/wjames111/react-scrollevents)

