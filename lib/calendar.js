'use strict';

var _propTypes;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _year_dropdown = require('./year_dropdown');

var _year_dropdown2 = _interopRequireDefault(_year_dropdown);

var _month = require('./month');

var _month2 = _interopRequireDefault(_month);

var _time = require('./time');

var _time2 = _interopRequireDefault(_time);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes2 = require('prop-types');

var _propTypes3 = _interopRequireDefault(_propTypes2);

var _date_utils = require('./date_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Calendar = (0, _createReactClass2.default)({
  displayName: 'Calendar',

  propTypes: (_propTypes = {
    dateFormat: _propTypes3.default.string.isRequired,
    dateFormatDay: _propTypes3.default.string.isRequired,
    endDate: _propTypes3.default.object,
    excludeDates: _propTypes3.default.array,
    filterDate: _propTypes3.default.func,
    fixedHeight: _propTypes3.default.bool,
    includeDates: _propTypes3.default.array,
    locale: _propTypes3.default.string,
    maxDate: _propTypes3.default.object,
    minDate: _propTypes3.default.object,
    onClickOutside: _propTypes3.default.func.isRequired,
    outsideClickIgnoreClass: _propTypes3.default.string.isRequired,
    onSelect: _propTypes3.default.func.isRequired,
    openToDate: _propTypes3.default.object,
    selected: _propTypes3.default.object,
    showYearDropdown: _propTypes3.default.bool,
    startDate: _propTypes3.default.object,
    todayButton: _propTypes3.default.string,
    timeZone: _propTypes3.default.string,
    timePickerButton: _propTypes3.default.bool,
    onToggle: _propTypes3.default.func,
    showTimePicker: _propTypes3.default.bool
  }, _defineProperty(_propTypes, 'onSelect', _propTypes3.default.func), _defineProperty(_propTypes, 'dateOnly', _propTypes3.default.bool), _defineProperty(_propTypes, 'onRemoveTime', _propTypes3.default.func), _propTypes),

  mixins: [require('react-onclickoutside')],

  getInitialState: function getInitialState() {
    return {
      date: this.localizeMoment(this.getDateInView())
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.selected && !(0, _date_utils.isSameDay)(nextProps.selected, this.props.selected)) {
      var localized = this.localizeMoment(nextProps.selected);
      var formattedLocalized = (0, _moment2.default)(localized).format(this.props.dateFormatDay);
      this.setState({
        date: (0, _moment2.default)(formattedLocalized)
      });
    }
  },
  handleClickOutside: function handleClickOutside(event) {
    this.props.onClickOutside(event);
  },
  getDateInView: function getDateInView() {
    var _props = this.props,
        selected = _props.selected,
        openToDate = _props.openToDate;

    var minDate = (0, _date_utils.getEffectiveMinDate)(this.props);
    var maxDate = (0, _date_utils.getEffectiveMaxDate)(this.props);
    var current = (0, _moment2.default)();
    if (selected) {
      return selected;
    } else if (minDate && maxDate && openToDate && openToDate.isBetween(minDate, maxDate)) {
      return openToDate;
    } else if (minDate && openToDate && openToDate.isAfter(minDate)) {
      return openToDate;
    } else if (minDate && minDate.isAfter(current)) {
      return minDate;
    } else if (maxDate && openToDate && openToDate.isBefore(maxDate)) {
      return openToDate;
    } else if (maxDate && maxDate.isBefore(current)) {
      return maxDate;
    } else if (openToDate) {
      return openToDate;
    } else {
      return current;
    }
  },
  localizeMoment: function localizeMoment(date) {
    return date.clone().locale(this.props.locale || _moment2.default.locale());
  },
  increaseMonth: function increaseMonth() {
    this.setState({
      date: this.state.date.clone().add(1, 'month')
    });
  },
  decreaseMonth: function decreaseMonth() {
    this.setState({
      date: this.state.date.clone().subtract(1, 'month')
    });
  },
  handleDayClick: function handleDayClick(day) {
    this.props.onSelect(day);
  },
  handleTimeClick: function handleTimeClick(time) {
    this.props.onSelectTime(time);
  },
  handleTimeRemoval: function handleTimeRemoval() {
    this.props.onRemoveTime();
  },
  changeYear: function changeYear(year) {
    this.setState({
      date: this.state.date.clone().set('year', year)
    });
  },
  header: function header() {
    var startOfWeek = this.state.date.clone().startOf('week');
    return [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
      var day = startOfWeek.clone().add(offset, 'days');
      return _react2.default.createElement(
        'div',
        { key: offset, className: 'react-datepicker__day-name' },
        day.localeData().weekdaysMin(day)
      );
    });
  },
  renderPreviousMonthButton: function renderPreviousMonthButton() {
    if ((0, _date_utils.allDaysDisabledBefore)(this.state.date, 'month', this.props)) {
      return;
    }
    return _react2.default.createElement('a', {
      className: 'react-datepicker__navigation react-datepicker__navigation--previous',
      onClick: this.decreaseMonth });
  },
  renderNextMonthButton: function renderNextMonthButton() {
    if ((0, _date_utils.allDaysDisabledAfter)(this.state.date, 'month', this.props)) {
      return;
    }
    return _react2.default.createElement('a', {
      className: 'react-datepicker__navigation react-datepicker__navigation--next',
      onClick: this.increaseMonth });
  },
  renderCurrentMonth: function renderCurrentMonth() {
    var classes = ['react-datepicker__current-month'];
    if (this.props.showYearDropdown) {
      classes.push('react-datepicker__current-month--hasYearDropdown');
    }
    return _react2.default.createElement(
      'div',
      { className: classes.join(' ') },
      this.state.date.format(this.props.dateFormat)
    );
  },
  renderYearDropdown: function renderYearDropdown() {
    if (!this.props.showYearDropdown) {
      return;
    }
    return _react2.default.createElement(_year_dropdown2.default, {
      onChange: this.changeYear,
      year: this.state.date.year() });
  },
  renderTodayButton: function renderTodayButton() {
    var _this = this;

    if (!this.props.todayButton) {
      return;
    }
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker__today-button', onClick: function onClick() {
          return _this.props.onSelect((0, _moment2.default)());
        } },
      this.props.todayButton
    );
  },
  renderTimePickerButton: function renderTimePickerButton() {
    if (!this.props.timePickerButton) {
      return;
    }
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker__today-button', onClick: this.props.onToggle },
      _react2.default.createElement(
        'span',
        null,
        'Select Time'
      )
    );
  },
  renderDatePickerButton: function renderDatePickerButton() {
    if (!this.props.timePickerButton) {
      return;
    }
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker__today-button', onClick: this.props.onToggle },
      _react2.default.createElement(
        'span',
        null,
        'Select Date'
      )
    );
  },
  renderDatePicker: function renderDatePicker() {
    if (this.props.showTimePicker) {
      return;
    }
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'react-datepicker__header' },
        this.renderPreviousMonthButton(),
        this.renderCurrentMonth(),
        this.renderYearDropdown(),
        this.renderNextMonthButton(),
        _react2.default.createElement(
          'div',
          null,
          this.header()
        )
      ),
      this.renderTodayButton(),
      _react2.default.createElement(_month2.default, {
        day: this.state.date,
        onDayClick: this.handleDayClick,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        excludeDates: this.props.excludeDates,
        includeDates: this.props.includeDates,
        filterDate: this.props.filterDate,
        selected: this.props.selected,
        startDate: this.props.startDate,
        endDate: this.props.endDate }),
      this.renderTimePickerButton()
    );
  },
  renderTimePicker: function renderTimePicker() {
    if (!this.props.showTimePicker) {
      return;
    }
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'react-datepicker__month' },
        _react2.default.createElement(_time2.default, {
          selected: this.props.selected,
          dateOnly: this.props.dateOnly,
          onTimeClick: this.handleTimeClick,
          onTimeRemoval: this.handleTimeRemoval
        })
      ),
      this.renderDatePickerButton()
    );
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker ignore-react-onclickoutside' },
      _react2.default.createElement('div', { className: 'react-datepicker__triangle' }),
      this.renderDatePicker(),
      this.renderTimePicker()
    );
  }
});

module.exports = Calendar;
