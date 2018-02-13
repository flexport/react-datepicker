'use strict';

var _date_input = require('./date_input');

var _date_input2 = _interopRequireDefault(_date_input);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tether_component = require('./tether_component');

var _tether_component2 = _interopRequireDefault(_tether_component);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _date_utils = require('./date_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside';

/**
 * General datepicker component.
 */

var DatePicker = (0, _createReactClass2.default)({
  displayName: 'DatePicker',

  propTypes: {
    autoComplete: _propTypes2.default.string,
    className: _propTypes2.default.string,
    dateFormat: _propTypes2.default.string,
    dateFormatCalendar: _propTypes2.default.string,
    dateFormatDay: _propTypes2.default.string,
    dateOnlyFormat: _propTypes2.default.string,
    dateOnly: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    endDate: _propTypes2.default.object,
    excludeDates: _propTypes2.default.array,
    filterDate: _propTypes2.default.func,
    fixedHeight: _propTypes2.default.bool,
    id: _propTypes2.default.string,
    includeDates: _propTypes2.default.array,
    inline: _propTypes2.default.bool,
    isClearable: _propTypes2.default.bool,
    locale: _propTypes2.default.string,
    maxDate: _propTypes2.default.object,
    minDate: _propTypes2.default.object,
    name: _propTypes2.default.string,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func.isRequired,
    onFocus: _propTypes2.default.func,
    openToDate: _propTypes2.default.object,
    placeholderText: _propTypes2.default.string,
    popoverAttachment: _propTypes2.default.string,
    popoverTargetAttachment: _propTypes2.default.string,
    popoverTargetOffset: _propTypes2.default.string,
    readOnly: _propTypes2.default.bool,
    renderCalendarTo: _propTypes2.default.any,
    required: _propTypes2.default.bool,
    selected: _propTypes2.default.object,
    showYearDropdown: _propTypes2.default.bool,
    startDate: _propTypes2.default.object,
    tabIndex: _propTypes2.default.number,
    tetherConstraints: _propTypes2.default.array,
    title: _propTypes2.default.string,
    todayButton: _propTypes2.default.string,
    timezone: _propTypes2.default.string,
    timePickerButton: _propTypes2.default.bool,
    timeDisabled: _propTypes2.default.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      dateFormatCalendar: 'MMMM YYYY',
      dateFormat: 'MMM/DD/YYYY',
      dateOnlyFormat: 'YYYY/MM/DD',
      dateFormatDay: 'YYYY/MM/DD',
      dateOnly: true,
      onChange: function onChange() {},

      disabled: false,
      onFocus: function onFocus() {},
      onBlur: function onBlur() {},

      popoverAttachment: 'top left',
      popoverTargetAttachment: 'bottom left',
      popoverTargetOffset: '10px 0',
      timezone: 'America/Los_Angeles',
      tetherConstraints: [{
        to: 'window',
        attachment: 'together'
      }],
      timePickerButton: true,
      timeDisabled: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      open: false,
      showTimePicker: false
    };
  },
  setOpen: function setOpen(open, showTimePicker) {
    this.setState({
      open: open,
      showTimePicker: showTimePicker
    });
  },
  handleBlur: function handleBlur(event) {
    if (this.state.open) {
      this.refs.input.focus();
    } else {
      this.props.onBlur(event);
    }
  },
  handleCalendarClickOutside: function handleCalendarClickOutside(event) {
    this.setOpen(false, false);
  },
  handleToggleTime: function handleToggleTime() {
    this.setState({
      showTimePicker: !this.state.showTimePicker
    });
  },
  handleSelect: function handleSelect(date) {
    var formattedDate = (0, _momentTimezone2.default)(date).format("YYYY-MM-DD");
    var previousHour = this.props.selected ? (0, _momentTimezone2.default)(this.props.selected).hours() : 0;
    var previousMinute = this.props.selected ? (0, _momentTimezone2.default)(this.props.selected).minutes() : 0;
    var adjustedDate = _momentTimezone2.default.tz(formattedDate + " " + previousHour + ":" + previousMinute, "YYYY-MM-DD HH:mm Z", this.props.timezone || "GMT");
    this.setSelected(adjustedDate, this.props.dateOnly);
    this.setOpen(false, false);
  },
  handleSelectTime: function handleSelectTime(time) {
    var formattedDate = (0, _momentTimezone2.default)(this.props.selected).format("YYYY-MM-DD");
    var adjustedDate = _momentTimezone2.default.tz(formattedDate + " " + time.hours + ":" + time.minutes, "YYYY-MM-DD HH:mm Z", this.props.timezone || "GMT");
    this.setSelected(adjustedDate, false);
    this.setOpen(false, false);
    this.handleToggleTime();
  },
  handleRemoveTime: function handleRemoveTime() {
    var formattedDate = (0, _momentTimezone2.default)(this.props.selected).format("YYYY-MM-DD");
    var adjustedDate = _momentTimezone2.default.tz(formattedDate + " +0000", "YYYY-MM-DD Z", "GMT");
    this.setSelected(adjustedDate, true);
    this.setOpen(false, false);
    this.handleToggleTime();
  },
  togglePicker: function togglePicker(clickLocation) {
    if (this.props.dateOnly) {
      this.setOpen(true, false);
    } else {

      this.setOpen(true, clickLocation <= 14 ? false : true);
    }
  },
  setSelected: function setSelected(date, isDateOnly) {
    if (!(0, _date_utils.isSameDayAndTime)(this.props.selected, date)) {
      this.props.onChange(date, isDateOnly);
    }
  },
  onInputClick: function onInputClick() {
    if (!this.props.disabled) {
      this.setOpen(true);
    }
  },
  onInputKeyDown: function onInputKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.setOpen(false);
    } else if (event.key === 'Tab') {
      this.setOpen(false);
    }
  },
  onClearClick: function onClearClick(event) {
    event.preventDefault();
    this.props.onChange(null, true);
  },
  renderCalendar: function renderCalendar() {
    if (!this.props.inline && (!this.state.open || this.props.disabled)) {
      return null;
    }
    return _react2.default.createElement(_calendar2.default, {
      ref: 'calendar',
      locale: this.props.locale,
      dateFormat: this.props.dateFormatCalendar,
      dateFormatDay: this.props.dateFormatDay,
      dateOnly: this.props.dateOnly,
      selected: this.props.selected,
      onSelect: this.handleSelect,
      onSelectTime: this.handleSelectTime,
      openToDate: this.props.openToDate,
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      excludeDates: this.props.excludeDates,
      filterDate: this.props.filterDate,
      onClickOutside: this.handleCalendarClickOutside,
      includeDates: this.props.includeDates,
      showYearDropdown: this.props.showYearDropdown,
      todayButton: this.props.todayButton,
      outsideClickIgnoreClass: outsideClickIgnoreClass,
      timezone: this.props.timezone,
      timePickerButton: this.props.timeDisabled ? false : this.props.timePickerButton,
      onToggle: this.handleToggleTime,
      showTimePicker: this.state.showTimePicker,
      onRemoveTime: this.handleRemoveTime,
      fixedHeight: this.props.fixedHeight });
  },
  renderDateInput: function renderDateInput() {
    var className = (0, _classnames3.default)(this.props.className, _defineProperty({}, outsideClickIgnoreClass, this.state.open));
    return _react2.default.createElement(_date_input2.default, {
      ref: 'input',
      id: this.props.id,
      name: this.props.name,
      date: (0, _momentTimezone2.default)(this.props.selected, this.props.dateOnly ? this.props.dateOnlyFormat : this.props.dateFormat),
      locale: this.props.locale,
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
      excludeDates: this.props.excludeDates,
      includeDates: this.props.includeDates,
      filterDate: this.props.filterDate,
      dateFormat: this.props.timeDisabled ? this.props.dateOnlyFormat : this.props.dateFormat,
      dateOnlyFormat: this.props.dateOnlyFormat,
      dateOnly: this.props.dateOnly,
      isEmpty: this.props.selected === null ? true : false,
      onClick: this.onInputClick,
      onInputKeyDown: this.onInputKeyDown,
      onChangeDate: this.setSelected,
      placeholder: this.props.placeholderText,
      disabled: this.props.disabled,
      autoComplete: this.props.autoComplete,
      className: className,
      title: this.props.title,
      readOnly: this.props.readOnly,
      required: this.props.required,
      tabIndex: this.props.tabIndex,
      timezone: this.props.timezone,
      showPicker: this.togglePicker });
  },
  renderClearButton: function renderClearButton() {
    if (this.props.isClearable && this.props.selected != null) {
      return _react2.default.createElement('a', { className: 'react-datepicker__close-icon', href: '#', onClick: this.onClearClick });
    } else {
      return null;
    }
  },
  render: function render() {
    var calendar = this.renderCalendar();

    if (this.props.inline) {
      return calendar;
    } else {
      return _react2.default.createElement(
        _tether_component2.default,
        {
          classPrefix: "react-datepicker__tether",
          attachment: this.props.popoverAttachment,
          targetAttachment: this.props.popoverTargetAttachment,
          targetOffset: this.props.popoverTargetOffset,
          renderElementTo: this.props.renderCalendarTo,
          constraints: this.props.tetherConstraints },
        _react2.default.createElement(
          'div',
          { className: 'react-datepicker__input-container' },
          this.renderDateInput(),
          this.renderClearButton()
        ),
        calendar
      );
    }
  }
});

module.exports = DatePicker;
