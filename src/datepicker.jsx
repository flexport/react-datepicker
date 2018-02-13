import DateInput from './date_input'
import Calendar from './calendar'
import React from 'react'
import ReactDOM from 'react-dom'
import TetherComponent from './tether_component'
import classnames from 'classnames'
import moment from 'moment-timezone'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'

import { isSameDay, isSameDayAndTime } from './date_utils'

var outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside'

/**
 * General datepicker component.
 */

var DatePicker = createReactClass({
  displayName: 'DatePicker',

  propTypes: {
    autoComplete: PropTypes.string,
    className: PropTypes.string,
    dateFormat: PropTypes.string,
    dateFormatCalendar: PropTypes.string,
    dateFormatDay: PropTypes.string,
    dateOnlyFormat: PropTypes.string,
    dateOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    endDate: PropTypes.object,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    fixedHeight: PropTypes.bool,
    id: PropTypes.string,
    includeDates: PropTypes.array,
    inline: PropTypes.bool,
    isClearable: PropTypes.bool,
    locale: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    openToDate: PropTypes.object,
    placeholderText: PropTypes.string,
    popoverAttachment: PropTypes.string,
    popoverTargetAttachment: PropTypes.string,
    popoverTargetOffset: PropTypes.string,
    readOnly: PropTypes.bool,
    renderCalendarTo: PropTypes.any,
    required: PropTypes.bool,
    selected: PropTypes.object,
    showYearDropdown: PropTypes.bool,
    startDate: PropTypes.object,
    tabIndex: PropTypes.number,
    tetherConstraints: PropTypes.array,
    title: PropTypes.string,
    todayButton: PropTypes.string,
    timezone: PropTypes.string,
    timePickerButton: PropTypes.bool,
    timeDisabled: PropTypes.bool
  },

  getDefaultProps () {
    return {
      dateFormatCalendar: 'MMMM YYYY',
      dateFormat: 'MMM/DD/YYYY',
      dateOnlyFormat: 'YYYY/MM/DD',
      dateFormatDay: 'YYYY/MM/DD',
      dateOnly: true,
      onChange () {},
      disabled: false,
      onFocus () {},
      onBlur () {},
      popoverAttachment: 'top left',
      popoverTargetAttachment: 'bottom left',
      popoverTargetOffset: '10px 0',
      timezone: 'America/Los_Angeles',
      tetherConstraints: [
        {
          to: 'window',
          attachment: 'together'
        }
      ],
      timePickerButton: true,
      timeDisabled: false
    }
  },

  getInitialState () {
    return {
      open: false,
      showTimePicker: false
    }
  },

  setOpen (open, showTimePicker) {
    this.setState({
      open,
      showTimePicker: showTimePicker
    })
  },

  handleBlur (event) {
    if (this.state.open) {
      this.refs.input.focus()
    } else {
      this.props.onBlur(event)
    }
  },

  handleCalendarClickOutside (event) {
    this.setOpen(false, false)
  },

  handleToggleTime () {
    this.setState({
      showTimePicker: !this.state.showTimePicker
    })
  },

  handleSelect (date) {
    let formattedDate = moment(date).format("YYYY-MM-DD");
    let previousHour = this.props.selected ? moment(this.props.selected).hours() : 0;
    let previousMinute = this.props.selected ? moment(this.props.selected).minutes() : 0;
    let adjustedDate = moment.tz(
      formattedDate + " " + previousHour + ":" + previousMinute,
      "YYYY-MM-DD HH:mm Z",
      this.props.timezone || "GMT"
    );
    this.setSelected(adjustedDate, this.props.dateOnly)
    this.setOpen(false, false)
  },

  handleSelectTime (time) {
    let formattedDate = moment(this.props.selected).format("YYYY-MM-DD");
    let adjustedDate = moment.tz(
      formattedDate + " " + time.hours + ":" + time.minutes,
      "YYYY-MM-DD HH:mm Z",
      this.props.timezone || "GMT"
    );
    this.setSelected(adjustedDate, false)
    this.setOpen(false, false)
    this.handleToggleTime()
  },

  handleRemoveTime () {
    let formattedDate = moment(this.props.selected).format("YYYY-MM-DD");
    let adjustedDate = moment.tz(formattedDate + " +0000", "YYYY-MM-DD Z", "GMT");
    this.setSelected(adjustedDate, true)
    this.setOpen(false, false)
    this.handleToggleTime()
  },

  togglePicker (clickLocation) {
    if (this.props.dateOnly) {
      this.setOpen(true, false);
    } else {

      this.setOpen(true, clickLocation <= 14 ? false : true);
    }
  },

  setSelected (date, isDateOnly) {
    if (!isSameDayAndTime(this.props.selected, date)) {
      this.props.onChange(date, isDateOnly)
    }
  },

  onInputClick () {
    if (!this.props.disabled) {
      this.setOpen(true)
    }
  },

  onInputKeyDown (event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      this.setOpen(false)
    } else if (event.key === 'Tab') {
      this.setOpen(false)
    }
  },

  onClearClick (event) {
    event.preventDefault()
    this.props.onChange(null, true)
  },

  renderCalendar () {
    if (!this.props.inline && (!this.state.open || this.props.disabled)) {
      return null
    }
    return <Calendar
        ref="calendar"
        locale={this.props.locale}
        dateFormat={this.props.dateFormatCalendar}
        dateFormatDay={this.props.dateFormatDay}
        dateOnly={this.props.dateOnly}
        selected={this.props.selected}
        onSelect={this.handleSelect}
        onSelectTime={this.handleSelectTime}
        openToDate={this.props.openToDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        excludeDates={this.props.excludeDates}
        filterDate={this.props.filterDate}
        onClickOutside={this.handleCalendarClickOutside}
        includeDates={this.props.includeDates}
        showYearDropdown={this.props.showYearDropdown}
        todayButton={this.props.todayButton}
        outsideClickIgnoreClass={outsideClickIgnoreClass}
        timezone={this.props.timezone}
        timePickerButton={this.props.timeDisabled ? false : this.props.timePickerButton}
        onToggle={this.handleToggleTime}
        showTimePicker={this.state.showTimePicker}
        onRemoveTime={this.handleRemoveTime}
        fixedHeight={this.props.fixedHeight} />
  },

  renderDateInput () {
    var className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: this.state.open
    })
    return <DateInput
        ref='input'
        id={this.props.id}
        name={this.props.name}
        date={moment(this.props.selected, this.props.dateOnly ? this.props.dateOnlyFormat : this.props.dateFormat)}
        locale={this.props.locale}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        excludeDates={this.props.excludeDates}
        includeDates={this.props.includeDates}
        filterDate={this.props.filterDate}
        dateFormat={this.props.timeDisabled ? this.props.dateOnlyFormat : this.props.dateFormat}
        dateOnlyFormat={this.props.dateOnlyFormat}
        dateOnly={this.props.dateOnly}
        isEmpty={this.props.selected === null ? true : false}
        onClick={this.onInputClick}
        onInputKeyDown={this.onInputKeyDown}
        onChangeDate={this.setSelected}
        placeholder={this.props.placeholderText}
        disabled={this.props.disabled}
        autoComplete={this.props.autoComplete}
        className={className}
        title={this.props.title}
        readOnly={this.props.readOnly}
        required={this.props.required}
        tabIndex={this.props.tabIndex}
        timezone={this.props.timezone}
        showPicker={this.togglePicker}/>
  },

  renderClearButton () {
    if (this.props.isClearable && this.props.selected != null) {
      return <a className="react-datepicker__close-icon" href="#" onClick={this.onClearClick}></a>
    } else {
      return null
    }
  },

  render () {
    const calendar = this.renderCalendar()

    if (this.props.inline) {
      return calendar
    } else {
      return (
        <TetherComponent
            classPrefix={"react-datepicker__tether"}
            attachment={this.props.popoverAttachment}
            targetAttachment={this.props.popoverTargetAttachment}
            targetOffset={this.props.popoverTargetOffset}
            renderElementTo={this.props.renderCalendarTo}
            constraints={this.props.tetherConstraints}>
          <div className="react-datepicker__input-container">
            {this.renderDateInput()}
            {this.renderClearButton()}
          </div>
          {calendar}
        </TetherComponent>
      )
    }
  }
})

module.exports = DatePicker
