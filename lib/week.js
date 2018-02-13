'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Week = (0, _createReactClass2.default)({
  displayName: 'Week',

  propTypes: {
    day: _propTypes2.default.object.isRequired,
    endDate: _propTypes2.default.object,
    excludeDates: _propTypes2.default.array,
    filterDate: _propTypes2.default.func,
    includeDates: _propTypes2.default.array,
    maxDate: _propTypes2.default.object,
    minDate: _propTypes2.default.object,
    month: _propTypes2.default.number,
    onDayClick: _propTypes2.default.func,
    selected: _propTypes2.default.object,
    startDate: _propTypes2.default.object
  },

  handleDayClick: function handleDayClick(day) {
    if (this.props.onDayClick) {
      this.props.onDayClick(day);
    }
  },
  renderDays: function renderDays() {
    var _this = this;

    var startOfWeek = this.props.day.clone().startOf('week');
    return [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
      var day = startOfWeek.clone().add(offset, 'days');
      return _react2.default.createElement(_day2.default, {
        key: offset,
        day: day,
        month: _this.props.month,
        onClick: _this.handleDayClick.bind(_this, day),
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
      { className: 'react-datepicker__week' },
      this.renderDays()
    );
  }
});

module.exports = Week;
