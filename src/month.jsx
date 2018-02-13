import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import Week from './week'

var Month = createReactClass({
  displayName: 'Month',

  propTypes: {
    day: PropTypes.object.isRequired,
    endDate: PropTypes.object,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    fixedHeight: PropTypes.bool,
    includeDates: PropTypes.array,
    maxDate: PropTypes.object,
    onDayClick: PropTypes.func,
    selected: PropTypes.object,
    startDate: PropTypes.object
  },

  handleDayClick (day) {
    if (this.props.onDayClick) {
      this.props.onDayClick(day)
    }
  },

  isWeekInMonth (startOfWeek) {
    const day = this.props.day
    const endOfWeek = startOfWeek.clone().add(6, 'days')
    return startOfWeek.isSame(day, 'month') || endOfWeek.isSame(day, 'month')
  },

  renderWeeks () {
    const startOfMonth = this.props.day.clone().startOf('month').startOf('week')
    return [0, 1, 2, 3, 4, 5]
      .map(offset => startOfMonth.clone().add(offset, 'weeks'))
      .filter(startOfWeek => this.props.fixedHeight || this.isWeekInMonth(startOfWeek))
      .map((startOfWeek, offset) =>
        <Week
            key={offset}
            day={startOfWeek}
            month={this.props.day.month()}
            onDayClick={this.handleDayClick}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            includeDates={this.props.includeDates}
            filterDate={this.props.filterDate}
            selected={this.props.selected}
            startDate={this.props.startDate}
            endDate={this.props.endDate} />
      )
  },

  render () {
    return (
      <div className="react-datepicker__month">
        {this.renderWeeks()}
      </div>
    )
  }

})

module.exports = Month
