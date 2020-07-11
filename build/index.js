module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},function(e,t,n){var r=n(9),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();e.exports=i},function(e,t,n){var r=n(1).Symbol;e.exports=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(4),u=c(i),a=(c(n(5)),c(n(6))),l=c(n(7));function c(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={allTriggerElements:[],triggersPlaystate:[],indicatorPosition:"50%",scrollingContainer:"body"},n.handleScroll=n.handleScroll.bind(n),n.checkTriggers=n.checkTriggers.bind(n),n.debounceScroll=e.isDebounce?(0,l.default)(n.handleScroll,e.debounceAmount,{trailing:!0,leading:!0}):n.handleScroll,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.triggerElements,n=e.scrollContainer,r=e.indicatorPlacement;console.log(t);var o=parseInt(r,10)/100*window.innerHeight,i=function(e){return"string"==typeof e?function(e){return document.querySelector(e)}(e):e.current},u=Array.isArray(t)?t:[t],a=i(n),l=[],c=u.map((function(e){return l.push(!1),i(e)}));this.setState({allTriggerElements:c,triggersPlaystate:l,indicatorPosition:o,scrollingContainer:a}),window.addEventListener("scroll",this.debounceScroll)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.debounceScroll)}},{key:"checkTriggers",value:function(e,t){var n=this,r=this.state,o=r.allTriggerElements,i=r.triggersPlaystate,u=this.props,a=u.isReplayable,l=u.onScrollYCallback,c=o[e],f=c.offsetHeight,s=(t-c.getBoundingClientRect().top)/f*100,d=function(t){var r=Object.assign([],i,function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},e,t));n.setState({triggersPlaystate:r})},p=function(t){var n=l,r=void 0;switch(t){case"start":r=n.start;break;case"progress":r=n.progress;break;case"end":r=n.end;break;default:r=null}"function"==typeof l?l(e,t,s):r&&r(c,s)},b=function(e,t){p(e),d(t)};if(s>=0&&s<=100)i[e]||b("start",!0),p("progress");else if(i[e]&&(b("end",!1),!a)){var y=[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(o));y.splice(e,1),this.setState({allTriggerElements:y})}}},{key:"handleScroll",value:function(){var e=this.state,t=e.allTriggerElements,n=e.indicatorPosition,r=e.scrollingContainer,o=t.length;o||window.removeEventListener("scroll",this.debounceScroll);for(var i=n+r.scrollTop,u=0;u<o;u+=1)this.checkTriggers(u,i)}},{key:"render",value:function(){var e=this.props,t=e.indicatorPlacement,n=e.isIndicator,o=e.customComponent,i=e.indicatorStyles,a=r({position:"fixed",height:"3px",width:"10vw",backgroundColor:"green",top:t,right:0,zIndex:100},i);return u.default.createElement("div",{className:"indicator",style:!o&&n?a:{}},o)}}]),t}(i.Component);f.defaultProps={scrollContainer:"body",indicatorPlacement:"50vh",isIndicator:!0,isReplayable:!0,debounceAmount:15,customComponent:null,indicatorStyles:{},isDebounce:!0},f.propTypes={scrollContainer:a.default.oneOfType([a.default.string,a.default.shape({current:a.default.instanceOf(Element)})]),indicatorPlacement:a.default.oneOfType([a.default.string,a.default.number]),isIndicator:a.default.bool,isReplayable:a.default.bool,debounceAmount:a.default.number,triggerElements:a.default.oneOfType([a.default.string,a.default.array]).isRequired,onScrollYCallback:a.default.oneOfType([a.default.objectOf(a.default.func),a.default.func]).isRequired,customComponent:a.default.element,indicatorStyles:a.default.objectOf(a.default.string),isDebounce:a.default.bool},t.default=f},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("react-dom")},function(e,t){e.exports=require("prop-types")},function(e,t,n){var r=n(0),o=n(8),i=n(11),u=Math.max,a=Math.min;e.exports=function(e,t,n){var l,c,f,s,d,p,b=0,y=!1,v=!1,g=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function m(t){var n=l,r=c;return l=c=void 0,b=t,s=e.apply(r,n)}function h(e){return b=e,d=setTimeout(j,t),y?m(e):s}function O(e){var n=e-p;return void 0===p||n>=t||n<0||v&&e-b>=f}function j(){var e=o();if(O(e))return w(e);d=setTimeout(j,function(e){var n=t-(e-p);return v?a(n,f-(e-b)):n}(e))}function w(e){return d=void 0,g&&l?m(e):(l=c=void 0,s)}function x(){var e=o(),n=O(e);if(l=arguments,c=this,p=e,n){if(void 0===d)return h(p);if(v)return clearTimeout(d),d=setTimeout(j,t),m(p)}return void 0===d&&(d=setTimeout(j,t)),s}return t=i(t)||0,r(n)&&(y=!!n.leading,f=(v="maxWait"in n)?u(i(n.maxWait)||0,t):f,g="trailing"in n?!!n.trailing:g),x.cancel=function(){void 0!==d&&clearTimeout(d),b=0,l=p=c=d=void 0},x.flush=function(){return void 0===d?s:w(o())},x}},function(e,t,n){var r=n(1);e.exports=function(){return r.Date.now()}},function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(this,n(10))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){var r=n(0),o=n(12),i=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,l=/^0o[0-7]+$/i,c=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(o(e))return NaN;if(r(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=r(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(i,"");var n=a.test(e);return n||l.test(e)?c(e.slice(2),n?2:8):u.test(e)?NaN:+e}},function(e,t,n){var r=n(13),o=n(16);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==r(e)}},function(e,t,n){var r=n(2),o=n(14),i=n(15),u=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":u&&u in Object(e)?o(e):i(e)}},function(e,t,n){var r=n(2),o=Object.prototype,i=o.hasOwnProperty,u=o.toString,a=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,a),n=e[a];try{e[a]=void 0;var r=!0}catch(e){}var o=u.call(e);return r&&(t?e[a]=n:delete e[a]),o}},function(e,t){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e}}]);