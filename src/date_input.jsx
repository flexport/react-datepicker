import moment from 'moment-timezone'
import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import { isSameDayAndTime, isDayDisabled } from './date_utils'

var DateInput = createReactClass({
  displayName: 'DateInput',

  propTypes: {
    date: PropTypes.object,
    dateFormat: PropTypes.string,
    dateOnlyFormat: PropTypes.string,
    dateOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    includeDates: PropTypes.array,
    locale: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onChangeDate: PropTypes.func,
    onInputKeyDown: PropTypes.func,
    isEmpty: PropTypes.bool,
    showPicker: PropTypes.func
  },

  getDefaultProps () {
    return {
      dateFormat: 'L'
    }
  },

  getInitialState () {
    return {
      value: this.props.isEmpty ? '' : this.safeDateFormat(this.props),
      manualDate: null
    }
  },

  componentWillReceiveProps (newProps) {
      this.setState({
        value: newProps.isEmpty ? '' : this.safeDateFormat(newProps)
      })
  },

  onKeyDown (event) {
    if (event.key === 'Enter') {
      this.handleBlur(event)
    } else {
      this.props.onInputKeyDown(event)
    }
  },

  handleFocus (event) {
    let clickLocation = event.target.selectionStart;
    this.props.showPicker(clickLocation);
  },

  handleChange (event) {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
    if (!event.isDefaultPrevented()) {
      this.handleChangeDate(event.target.value)
    }
  },

  handleChangeDate (value) {
    this.setState({
      manualDate: value,
      value: value
    })
  },

  safeDateFormat (props) {
    return props.date && props.date.clone()
      .locale(props.locale || moment.locale())
      .format(props.dateOnly ? props.dateOnlyFormat : props.dateFormat) || ''
  },

  handleBlur (event) {
    this.checkManualDate()
  },

  checkManualDate () {
    let dateFormats = [
      this.props.dateOnlyFormat,

      "MMM D, YYYY",
      "MMM D, YY",
      "MMMM D, YYYY",
      "MMMM D, YY",

      // without commas
      "MMM D YYYY",
      "MMM D YY",
      "MMMM D YYYY",
      "MMMM D YY",

      "MM-DD-YYYY",
      "MM/DD/YYYY",
      "MM-DD-YY",
      "MM/DD/YY",
    ];

    let timeFormats = [
      "HH:mm:ss a",
    ];

    let manualDateString = this.state.manualDate;

    // Add a space before pm if there wasn't one
    if (manualDateString !== null) {
      manualDateString = manualDateString.replace(/([0-9]+)pm/, '$1 pm')
    }

    let dateTimeFormats = [];
    dateTimeFormats.push(this.props.dateFormat);
    dateFormats.forEach (dateFormat => {
      timeFormats.forEach (timeFormat => {
        dateTimeFormats.push(dateFormat + " " + timeFormat);
      });
      timeFormats.forEach (timeFormat => {
        dateTimeFormats.push(dateFormat);
      });
    });

    if (this.state.manualDate === null) {
      return;
    }

    let fullDate = moment.tz(manualDateString, dateTimeFormats, "GMT");

    let formatted = fullDate.format(this.props.dateFormat);
    let dateHour = fullDate.get('hour');
    let dateMinute = fullDate.get('minute');
    let isDateOnly = ((dateHour === 0) && (dateMinute === 0) && (this.state.manualDate.indexOf(":") === -1));

    if (this.props.onChangeDate) {
      if (!isDateOnly) {
        if (fullDate.isValid() && !isDayDisabled(fullDate, this.props)) {
          this.props.onChangeDate(fullDate, false)
        } else if (this.state.value === '') {
          this.props.onChangeDate('', false)
        }
      } else {
        if (fullDate.isValid() && !isDayDisabled(fullDate, this.props))  {
          this.props.onChangeDate(fullDate, true)
        }
      }
      this.state.manualDate = null;
    }
    this.setState({
      date: fullDate,
      value: this.safeDateFormat(this.props)
    })
  },

  focus () {
    this.refs.input.focus()
  },

  render () {
    const {
      date, locale, minDate, maxDate, excludeDates, includeDates,
      filterDate, dateFormat, dateOnlyFormat, dateOnly, isEmpty,
      onInputKeyDown, onChangeDate, timezone, showPicker,
      ...inputProps
    } = this.props;
    return <input
        ref='input'
        type='text'
        {...inputProps}
        value={this.state.value}
        onKeyDown={this.onKeyDown}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onClick={this.handleFocus} />
  }
})

module.exports = DateInput
