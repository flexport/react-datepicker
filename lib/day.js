'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _date_utils = require('./date_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Day = (0, _createReactClass2.default)({
  displayName: 'Day',

  propTypes: {
    day: _propTypes2.default.object.isRequired,
    endDate: _propTypes2.default.object,
    excludeDates: _propTypes2.default.array,
    filterDate: _propTypes2.default.func,
    includeDates: _propTypes2.default.array,
    maxDate: _propTypes2.default.object,
    minDate: _propTypes2.default.object,
    month: _propTypes2.default.number,
    onClick: _propTypes2.default.func,
    selected: _propTypes2.default.object,
    startDate: _propTypes2.default.object
  },

  handleClick: function handleClick(event) {
    if (!this.isDisabled() && this.props.onClick) {
      this.props.onClick(event);
    }
  },
  isSameDay: function isSameDay(other) {
    return (0, _date_utils.isSameDay)(this.props.day, other);
  },
  isDisabled: function isDisabled() {
    return (0, _date_utils.isDayDisabled)(this.props.day, this.props);
  },
  isInRange: function isInRange() {
    var _props = this.props,
        day = _props.day,
        startDate = _props.startDate,
        endDate = _props.endDate;

    if (!startDate || !endDate) return false;

    var before = startDate.clone().startOf('day').subtract(1, 'seconds');
    var after = endDate.clone().startOf('day').add(1, 'seconds');
    return day.clone().startOf('day').isBetween(before, after);
  },
  isWeekend: function isWeekend() {
    var weekday = this.props.day.day();
    return weekday === 0 || weekday === 6;
  },
  isOutsideMonth: function isOutsideMonth() {
    return this.props.month !== undefined && this.props.month !== this.props.day.month();
  },
  getClassNames: function getClassNames() {
    return (0, _classnames2.default)('react-datepicker__day', {
      'react-datepicker__day--disabled': this.isDisabled(),
      'react-datepicker__day--selected': this.isSameDay(this.props.selected),
      'react-datepicker__day--in-range': this.isInRange(),
      'react-datepicker__day--today': this.isSameDay((0, _moment2.default)()),
      'react-datepicker__day--weekend': this.isWeekend(),
      'react-datepicker__day--outside-month': this.isOutsideMonth()
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: this.getClassNames(), onClick: this.handleClick },
      this.props.day.date()
    );
  }
});

module.exports = Day;
