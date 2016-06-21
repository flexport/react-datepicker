'use strict';

var _date_input = require('./date_input');

var _date_input2 = _interopRequireDefault(_date_input);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tether_component = require('./tether_component');

var _tether_component2 = _interopRequireDefault(_tether_component);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _date_utils = require('./date_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside';

/**
 * General datepicker component.
 */

var DatePicker = _react2.default.createClass({
  displayName: 'DatePicker',

  propTypes: {
    autoComplete: _react2.default.PropTypes.string,
    className: _react2.default.PropTypes.string,
    dateFormat: _react2.default.PropTypes.string,
    dateFormatCalendar: _react2.default.PropTypes.string,
    dateFormatDay: _react2.default.PropTypes.string,
    dateOnlyFormat: _react2.default.PropTypes.string,
    dateOnly: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool,
    endDate: _react2.default.PropTypes.object,
    excludeDates: _react2.default.PropTypes.array,
    filterDate: _react2.default.PropTypes.func,
    id: _react2.default.PropTypes.string,
    includeDates: _react2.default.PropTypes.array,
    inline: _react2.default.PropTypes.bool,
    isClearable: _react2.default.PropTypes.bool,
    locale: _react2.default.PropTypes.string,
    maxDate: _react2.default.PropTypes.object,
    minDate: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    onBlur: _react2.default.PropTypes.func,
    onChange: _react2.default.PropTypes.func.isRequired,
    onFocus: _react2.default.PropTypes.func,
    openToDate: _react2.default.PropTypes.object,
    placeholderText: _react2.default.PropTypes.string,
    popoverAttachment: _react2.default.PropTypes.string,
    popoverTargetAttachment: _react2.default.PropTypes.string,
    popoverTargetOffset: _react2.default.PropTypes.string,
    readOnly: _react2.default.PropTypes.bool,
    renderCalendarTo: _react2.default.PropTypes.any,
    required: _react2.default.PropTypes.bool,
    selected: _react2.default.PropTypes.object,
    showYearDropdown: _react2.default.PropTypes.bool,
    startDate: _react2.default.PropTypes.object,
    tabIndex: _react2.default.PropTypes.number,
    tetherConstraints: _react2.default.PropTypes.array,
    title: _react2.default.PropTypes.string,
    todayButton: _react2.default.PropTypes.string,
    timeZone: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      dateFormatCalendar: 'MMMM YYYY',
      dateFormatDay: 'YYYY/MM/DD',
      dateOnly: true,
      onChange: function onChange() {},

      disabled: false,
      onFocus: function onFocus() {},
      onBlur: function onBlur() {},

      popoverAttachment: 'top left',
      popoverTargetAttachment: 'bottom left',
      popoverTargetOffset: '10px 0',
      timeZone: 'America/Los_Angeles',
      tetherConstraints: [{
        to: 'window',
        attachment: 'together'
      }]
    };
  },
  getInitialState: function getInitialState() {
    return {
      open: false
    };
  },
  setOpen: function setOpen(open) {
    this.setState({ open: open });
  },
  handleFocus: function handleFocus(event) {
    this.props.onFocus(event);
    this.setOpen(true);
  },
  handleBlur: function handleBlur(event) {
    if (this.state.open) {
      this.refs.input.focus();
    } else {
      this.props.onBlur(event);
    }
  },
  handleCalendarClickOutside: function handleCalendarClickOutside(event) {
    this.setOpen(false);
  },
  handleSelect: function handleSelect(date) {
    var formattedDate = (0, _momentTimezone2.default)(date).format();
    var previousHour = (0, _momentTimezone2.default)(this.props.selected).hours();
    var previousMinute = (0, _momentTimezone2.default)(this.props.selected).minutes();
    var adjustedDate = (0, _momentTimezone2.default)(formattedDate).hours(previousHour).minutes(previousMinute);
    var dateTZ = _momentTimezone2.default.tz((0, _momentTimezone2.default)(adjustedDate), this.props.timeZone);
    this.setSelected(dateTZ, this.props.dateOnly);
    this.setOpen(false);
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
      selected: this.props.selected,
      onSelect: this.handleSelect,
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
      timeZone: this.props.timeZone });
  },
  renderDateInput: function renderDateInput() {
    var className = (0, _classnames3.default)(this.props.className, _defineProperty({}, outsideClickIgnoreClass, this.state.open));
    return _react2.default.createElement(_date_input2.default, {
      ref: 'input',
      id: this.props.id,
      name: this.props.name,
      date: _momentTimezone2.default.tz(this.props.selected, this.props.dateOnly ? this.props.dateOnlyFormat : this.props.dateFormat, this.props.timeZone),
      locale: this.props.locale,
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
      excludeDates: this.props.excludeDates,
      includeDates: this.props.includeDates,
      filterDate: this.props.filterDate,
      dateFormat: this.props.dateFormat,
      dateOnlyFormat: this.props.dateOnlyFormat,
      dateOnly: this.props.dateOnly,
      onFocus: this.handleFocus,
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
      timeZone: this.props.timeZone });
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