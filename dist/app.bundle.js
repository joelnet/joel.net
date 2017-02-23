/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var compose = exports.compose = function compose() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (data) {
    return Array.prototype.reduceRight.call(functions, function (value, func) {
      return func(value);
    }, data);
  };
};

var map = exports.map = function map(f) {
  return function (x) {
    return Array.prototype.map.call(x, f);
  };
};

var pipe = exports.pipe = function pipe() {
  for (var _len2 = arguments.length, functions = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    functions[_key2] = arguments[_key2];
  }

  return function (data) {
    return Array.prototype.reduce.call(functions, function (value, func) {
      return func(value);
    }, data);
  };
};

var set = exports.set = function set(prop) {
  for (var _len3 = arguments.length, props = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    props[_key3 - 1] = arguments[_key3];
  }

  return function (value) {
    return function (obj) {
      return !props.length ? (obj[prop] = value, obj) : (set(props)(value)(obj[prop]), obj);
    };
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.replaceDomWithHtml = exports.insertAfter = exports.hideElement = exports.addEventListener = exports.$ = undefined;

var _functional = __webpack_require__(0);

var $ = exports.$ = document.querySelectorAll.bind(document);

var addEventListener = exports.addEventListener = function addEventListener() {
    for (var _len = arguments.length, events = Array(_len), _key = 0; _key < _len; _key++) {
        events[_key] = arguments[_key];
    }

    return function (func) {
        return function (obj) {
            return events.reduce(function (obj, event) {
                return obj.addEventListener(event, func), obj;
            }, obj);
        };
    };
};

var hideElement = exports.hideElement = (0, _functional.set)('style', 'display')('none');

var insertAfter = exports.insertAfter = function insertAfter(html) {
    return function (dom) {
        return dom.insertAdjacentHTML('afterend', html);
    };
};

var replaceDomWithHtml = exports.replaceDomWithHtml = function replaceDomWithHtml(html) {
    return (0, _functional.pipe)(hideElement, function (dom) {
        return insertAfter(html)(dom), dom;
    });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _functional = __webpack_require__(0);

var _functionalDom = __webpack_require__(1);

var _hexagon = __webpack_require__(3);

console.clear();

var mapImageToHexagon = (0, _functional.map)(_hexagon.imageToHexagon);
var images = (0, _functionalDom.$)('img[data-transform="hexagon"]');

mapImageToHexagon(images);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageToHexagon = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _functional = __webpack_require__(0);

var _functionalDom = __webpack_require__(1);

var imageToHexagonHtml = function imageToHexagonHtml(_ref) {
  var count = _ref.count,
      image = _ref.image,
      className = _ref.className,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === undefined ? 2 : _ref$strokeWidth,
      _ref$strokeColor = _ref.strokeColor,
      strokeColor = _ref$strokeColor === undefined ? '#333333' : _ref$strokeColor;
  return '<svg viewbox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" class="' + className + '">\n     <defs>\n       <pattern id="img' + count + '" patternUnits="userSpaceOnUse" width="100" height="100">\n         <image xlink:href="' + image + '" x="-25" width="150" height="100" />\n       </pattern>\n     </defs>\n     <svg width="96" height="96" viewBox="0 0 100 100" x="2" y="2">\n       <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#img' + count + ')" stroke="white" stroke-width="3" />\n     </svg>\n     <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="transparent" stroke="' + strokeColor + '" stroke-width="' + strokeWidth + '" />\n     <svg width="102" height="102" viewBox="0 0 100 100" x="-1" y="-1">\n       <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="transparent" stroke="#ffffff" stroke-width="0.25" stroke-opacity="0.4" />\n     </svg>\n   </svg>';
};
var store = function store(func) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return function (obj) {
      return func(_extends({ count: ++state }, obj));
    };
  };
};
var imageToHexagonHtmlStore = store(imageToHexagonHtml)();
var imageToOptions = function imageToOptions(dom) {
  return {
    dom: dom,
    image: dom.getAttribute('src'),
    className: dom.getAttribute('class') || '',
    strokeWidth: dom.getAttribute('data-stroke-width') || undefined,
    strokeColor: dom.getAttribute('data-stroke-color') || undefined
  };
};

var getHexagonHtml = function getHexagonHtml(x) {
  return _extends({}, x, { html: imageToHexagonHtmlStore(x) });
};

var imageToHexagon = exports.imageToHexagon = (0, _functional.pipe)(imageToOptions, getHexagonHtml, function (x) {
  return (0, _functionalDom.replaceDomWithHtml)(x.html)(x.dom);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map