'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tether = require('tether');

var _tether2 = _interopRequireDefault(_tether);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function childrenPropType(_ref, propName, componentName) {
  var children = _ref.children;

  var childCount = _react.Children.count(children);
  if (childCount <= 0) {
    return new Error(componentName + ' expects at least one child to use as the target element.');
  } else if (childCount > 2) {
    return new Error('Only a max of two children allowed in ' + componentName + '.');
  }
}

var attachmentPositions = ['top left', 'top center', 'top right', 'middle left', 'middle center', 'middle right', 'bottom left', 'bottom center', 'bottom right'];

var TetherComponent = (0, _createReactClass2.default)({
  displayName: 'TetherComponent',

  propTypes: {
    attachment: _propTypes2.default.oneOf(attachmentPositions).isRequired,
    children: childrenPropType,
    className: _propTypes2.default.string,
    classPrefix: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    constraints: _propTypes2.default.array,
    enabled: _propTypes2.default.bool,
    id: _propTypes2.default.string,
    offset: _propTypes2.default.string,
    optimizations: _propTypes2.default.object,
    renderElementTag: _propTypes2.default.string,
    renderElementTo: _propTypes2.default.any,
    style: _propTypes2.default.object,
    targetAttachment: _propTypes2.default.oneOf(attachmentPositions),
    targetModifier: _propTypes2.default.string,
    targetOffset: _propTypes2.default.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      renderElementTag: 'div',
      renderElementTo: null
    };
  },
  componentDidMount: function componentDidMount() {
    this._targetNode = _reactDom2.default.findDOMNode(this);
    this._update();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._update();
  },
  componentWillUnmount: function componentWillUnmount() {
    this._destroy();
  },
  disable: function disable() {
    this._tether.disable();
  },
  enable: function enable() {
    this._tether.enable();
  },
  position: function position() {
    this._tether.position();
  },
  _destroy: function _destroy() {
    if (this._elementParentNode) {
      _reactDom2.default.unmountComponentAtNode(this._elementParentNode);
      this._elementParentNode.parentNode.removeChild(this._elementParentNode);
    }

    if (this._tether) {
      this._tether.destroy();
    }

    this._elementParentNode = null;
    this._tether = null;
  },
  _update: function _update() {
    var _this = this;

    var _props = this.props,
        children = _props.children,
        renderElementTag = _props.renderElementTag,
        renderElementTo = _props.renderElementTo;

    var elementComponent = children[1];

    // if no element component provided, bail out
    if (!elementComponent) {
      // destroy Tether elements if they have been created
      if (this._tether) {
        this._destroy();
      }
      return;
    }

    // create element node container if it hasn't been yet
    if (!this._elementParentNode) {
      // create a node that we can stick our content Component in
      this._elementParentNode = document.createElement(renderElementTag);

      // append node to the end of the body
      var renderTo = renderElementTo || document.body;
      renderTo.appendChild(this._elementParentNode);
    }

    // render element component into the DOM
    _reactDom2.default.unstable_renderSubtreeIntoContainer(this, elementComponent, this._elementParentNode, function () {
      // don't update Tether until the subtree has finished rendering
      _this._updateTether();
    });
  },
  _updateTether: function _updateTether() {
    var _props2 = this.props,
        renderElementTag = _props2.renderElementTag,
        renderElementTo = _props2.renderElementTo,
        options = _objectWithoutProperties(_props2, ['renderElementTag', 'renderElementTo']); // eslint-disable-line no-unused-vars


    var tetherOptions = _extends({
      target: this._targetNode,
      element: this._elementParentNode
    }, options);

    if (!this._tether) {
      this._tether = new _tether2.default(tetherOptions);
    } else {
      this._tether.setOptions(tetherOptions);
    }

    this._tether.position();
  },
  render: function render() {
    var children = this.props.children;

    var firstChild = null;

    // we use forEach because the second child could be null
    // causing children to not be an array
    _react.Children.forEach(children, function (child, index) {
      if (index === 0) {
        firstChild = child;
        return;
      }
    });

    return firstChild;
  }
});

module.exports = TetherComponent;
