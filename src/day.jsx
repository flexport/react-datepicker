import moment from 'moment'
import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isSameDay, isDayDisabled } from './date_utils'

var Day = createReactClass({
  displayName: 'Day',

  propTypes: {
    day: PropTypes.object.isRequired,
    endDate: PropTypes.object,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    includeDates: PropTypes.array,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    month: PropTypes.number,
    onClick: PropTypes.func,
    selected: PropTypes.object,
    startDate: PropTypes.object
  },

  handleClick (event) {
    if (!this.isDisabled() && this.props.onClick) {
      this.props.onClick(event)
    }
  },

  isSameDay (other) {
    return isSameDay(this.props.day, other)
  },

  isDisabled () {
    return isDayDisabled(this.props.day, this.props)
  },

  isInRange () {
    const { day, startDate, endDate } = this.props
    if (!startDate || !endDate) return false

    const before = startDate.clone().startOf('day').subtract(1, 'seconds')
    const after = endDate.clone().startOf('day').add(1, 'seconds')
    return day.clone().startOf('day').isBetween(before, after)
  },

  isWeekend () {
    const weekday = this.props.day.day()
    return weekday === 0 || weekday === 6
  },

  isOutsideMonth () {
    return this.props.month !== undefined &&
      this.props.month !== this.props.day.month()
  },

  getClassNames () {
    return classnames('react-datepicker__day', {
      'react-datepicker__day--disabled': this.isDisabled(),
      'react-datepicker__day--selected': this.isSameDay(this.props.selected),
      'react-datepicker__day--in-range': this.isInRange(),
      'react-datepicker__day--today': this.isSameDay(moment()),
      'react-datepicker__day--weekend': this.isWeekend(),
      'react-datepicker__day--outside-month': this.isOutsideMonth()
    })
  },

  render () {
    return (
      <div className={this.getClassNames()} onClick={this.handleClick}>
        {this.props.day.date()}
      </div>
    )
  }
})

module.exports = Day
