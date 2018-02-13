'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _week = require('./week');

var _week2 = _interopRequireDefault(_week);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Month = (0, _createReactClass2.default)({
  displayName: 'Month',

  propTypes: {
    day: _propTypes2.default.object.isRequired,
    endDate: _propTypes2.default.object,
    excludeDates: _propTypes2.default.array,
    filterDate: _propTypes2.default.func,
    fixedHeight: _propTypes2.default.bool,
    includeDates: _propTypes2.default.array,
    maxDate: _propTypes2.default.object,
    onDayClick: _propTypes2.default.func,
    selected: _propTypes2.default.object,
    startDate: _propTypes2.default.object
  },

  handleDayClick: function handleDayClick(day) {
    if (this.props.onDayClick) {
      this.props.onDayClick(day);
    }
  },
  isWeekInMonth: function isWeekInMonth(startOfWeek) {
    var day = this.props.day;
    var endOfWeek = startOfWeek.clone().add(6, 'days');
    return startOfWeek.isSame(day, 'month') || endOfWeek.isSame(day, 'month');
  },
  renderWeeks: function renderWeeks() {
    var _this = this;

    var startOfMonth = this.props.day.clone().startOf('month').startOf('week');
    return [0, 1, 2, 3, 4, 5].map(function (offset) {
      return startOfMonth.clone().add(offset, 'weeks');
    }).filter(function (startOfWeek) {
      return _this.props.fixedHeight || _this.isWeekInMonth(startOfWeek);
    }).map(function (startOfWeek, offset) {
      return _react2.default.createElement(_week2.default, {
        key: offset,
        day: startOfWeek,
        month: _this.props.day.month(),
        onDayClick: _this.handleDayClick,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        excludeDates: _this.props.excludeDates,
        includeDates: _this.props.includeDates,
        filterDate: _this.props.filterDate,
        selected: _this.props.selected,
        startDate: _this.props.startDate,
        endDate: _this.props.endDate });
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker__month' },
      this.renderWeeks()
    );
  }
});

module.exports = Month;
