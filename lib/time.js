'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _date_utils = require('./date_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Time = (0, _createReactClass2.default)({
  displayName: 'Time',

  propTypes: {
    selected: _propTypes2.default.object,
    onTimeClick: _propTypes2.default.func,
    onTimeRemoval: _propTypes2.default.func,
    dateOnly: _propTypes2.default.bool
  },

  getInitialState: function getInitialState() {
    return {
      selectedTime: []
    };
  },


  componentDidMount: function componentDidMount() {
    if (!this.props.dateOnly && this.refs.activeTime) {
      this.scrollElementIntoViewIfNeeded(this.refs.activeTime);
    }
  },

  scrollElementIntoViewIfNeeded: function scrollElementIntoViewIfNeeded(domNode) {
    var containerDomNode = ReactDOM.findDOMNode(this.refs.timeContainer);
    var scrollPosition = domNode.id * domNode.offsetHeight;
    containerDomNode.scrollTop = scrollPosition;
  },
  handleTimeClick: function handleTimeClick(time) {
    this.props.onTimeClick(time);
  },
  handleTimeRemoval: function handleTimeRemoval() {
    this.props.onTimeRemoval();
  },
  renderTimes: function renderTimes() {
    var _this = this;

    var selectedHours = null;
    var selectedMinutes = null;

    if (!this.props.dateOnly) {
      selectedHours = (0, _moment2.default)(this.props.selected).get('hours');
      selectedMinutes = (0, _moment2.default)(this.props.selected).get('minutes');
    }

    var times = [];
    var startOfDay = (0, _moment2.default)().startOf('day');
    var endOfDay = (0, _moment2.default)().endOf('day');
    var time = startOfDay;

    while (time <= endOfDay) {
      times.push(time.toObject());
      time = time.clone().add(30, 'minutes');
    }
    return _react2.default.createElement(
      'div',
      { ref: 'timeContainer', className: 'react-datepicker__times' },
      _react2.default.createElement(
        'div',
        { key: 'unknown', id: 'unknown', ref: selectedHours && selectedMinutes === null ? 'activeTime' : null, className: 'react-datepicker__time' + (this.props.dateOnly ? ' react-datepicker__time--selected' : ''), onClick: function onClick() {
            return _this.handleTimeRemoval();
          } },
        'Unknown'
      ),
      times.map(function (time, i) {
        return _react2.default.createElement(
          'div',
          { key: time.hours + time.minutes, id: i, ref: selectedHours === time.hours && selectedMinutes === time.minutes ? 'activeTime' : null, className: 'react-datepicker__time' + (selectedHours === time.hours && selectedMinutes === time.minutes ? ' react-datepicker__time--selected' : ''), onClick: function onClick() {
              return _this.handleTimeClick(time);
            } },
          (0, _moment2.default)().hours(time.hours).minutes(time.minutes).format('h:mm a').toString()
        );
      })
    );
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      this.renderTimes()
    );
  }
});

module.exports = Time;
