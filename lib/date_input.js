'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _date_utils = require('./date_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DateInput = (0, _createReactClass2.default)({
  displayName: 'DateInput',

  propTypes: {
    date: _propTypes2.default.object,
    dateFormat: _propTypes2.default.string,
    dateOnlyFormat: _propTypes2.default.string,
    dateOnly: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    excludeDates: _propTypes2.default.array,
    filterDate: _propTypes2.default.func,
    includeDates: _propTypes2.default.array,
    locale: _propTypes2.default.string,
    maxDate: _propTypes2.default.object,
    minDate: _propTypes2.default.object,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onChangeDate: _propTypes2.default.func,
    onInputKeyDown: _propTypes2.default.func,
    isEmpty: _propTypes2.default.bool,
    showPicker: _propTypes2.default.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      dateFormat: 'L'
    };
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.isEmpty ? '' : this.safeDateFormat(this.props),
      manualDate: null
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState({
      value: newProps.isEmpty ? '' : this.safeDateFormat(newProps)
    });
  },
  onKeyDown: function onKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleBlur(event);
    } else {
      this.props.onInputKeyDown(event);
    }
  },
  handleFocus: function handleFocus(event) {
    var clickLocation = event.target.selectionStart;
    this.props.showPicker(clickLocation);
  },
  handleChange: function handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    if (!event.isDefaultPrevented()) {
      this.handleChangeDate(event.target.value);
    }
  },
  handleChangeDate: function handleChangeDate(value) {
    this.setState({
      manualDate: value,
      value: value
    });
  },
  safeDateFormat: function safeDateFormat(props) {
    return props.date && props.date.clone().locale(props.locale || _momentTimezone2.default.locale()).format(props.dateOnly ? props.dateOnlyFormat : props.dateFormat) || '';
  },
  handleBlur: function handleBlur(event) {
    this.checkManualDate();
  },
  checkManualDate: function checkManualDate() {
    var dateFormats = [this.props.dateOnlyFormat, "MMM D, YYYY", "MMM D, YY", "MMMM D, YYYY", "MMMM D, YY",

    // without commas
    "MMM D YYYY", "MMM D YY", "MMMM D YYYY", "MMMM D YY", "MM-DD-YYYY", "MM/DD/YYYY", "MM-DD-YY", "MM/DD/YY"];

    var timeFormats = ["HH:mm:ss a"];

    var manualDateString = this.state.manualDate;

    // Add a space before pm if there wasn't one
    if (manualDateString !== null) {
      manualDateString = manualDateString.replace(/([0-9]+)pm/, '$1 pm');
    }

    var dateTimeFormats = [];
    dateTimeFormats.push(this.props.dateFormat);
    dateFormats.forEach(function (dateFormat) {
      timeFormats.forEach(function (timeFormat) {
        dateTimeFormats.push(dateFormat + " " + timeFormat);
      });
      timeFormats.forEach(function (timeFormat) {
        dateTimeFormats.push(dateFormat);
      });
    });

    if (this.state.manualDate === null) {
      return;
    }

    var fullDate = _momentTimezone2.default.tz(manualDateString, dateTimeFormats, "GMT");

    var formatted = fullDate.format(this.props.dateFormat);
    var dateHour = fullDate.get('hour');
    var dateMinute = fullDate.get('minute');
    var isDateOnly = dateHour === 0 && dateMinute === 0 && this.state.manualDate.indexOf(":") === -1;

    if (this.props.onChangeDate) {
      if (!isDateOnly) {
        if (fullDate.isValid() && !(0, _date_utils.isDayDisabled)(fullDate, this.props)) {
          this.props.onChangeDate(fullDate, false);
        } else if (this.state.value === '') {
          this.props.onChangeDate('', false);
        }
      } else {
        if (fullDate.isValid() && !(0, _date_utils.isDayDisabled)(fullDate, this.props)) {
          this.props.onChangeDate(fullDate, true);
        }
      }
      this.state.manualDate = null;
    }
    this.setState({
      date: fullDate,
      value: this.safeDateFormat(this.props)
    });
  },
  focus: function focus() {
    this.refs.input.focus();
  },
  render: function render() {
    var _props = this.props,
        date = _props.date,
        locale = _props.locale,
        minDate = _props.minDate,
        maxDate = _props.maxDate,
        excludeDates = _props.excludeDates,
        includeDates = _props.includeDates,
        filterDate = _props.filterDate,
        dateFormat = _props.dateFormat,
        dateOnlyFormat = _props.dateOnlyFormat,
        dateOnly = _props.dateOnly,
        isEmpty = _props.isEmpty,
        onInputKeyDown = _props.onInputKeyDown,
        onChangeDate = _props.onChangeDate,
        timezone = _props.timezone,
        showPicker = _props.showPicker,
        inputProps = _objectWithoutProperties(_props, ['date', 'locale', 'minDate', 'maxDate', 'excludeDates', 'includeDates', 'filterDate', 'dateFormat', 'dateOnlyFormat', 'dateOnly', 'isEmpty', 'onInputKeyDown', 'onChangeDate', 'timezone', 'showPicker']);

    return _react2.default.createElement('input', _extends({
      ref: 'input',
      type: 'text'
    }, inputProps, {
      value: this.state.value,
      onKeyDown: this.onKeyDown,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onClick: this.handleFocus }));
  }
});

module.exports = DateInput;
