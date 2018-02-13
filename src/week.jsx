import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import Day from './day'

var Week = createReactClass({
  displayName: 'Week',

  propTypes: {
    day: PropTypes.object.isRequired,
    endDate: PropTypes.object,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    includeDates: PropTypes.array,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    month: PropTypes.number,
    onDayClick: PropTypes.func,
    selected: PropTypes.object,
    startDate: PropTypes.object
  },

  handleDayClick (day) {
    if (this.props.onDayClick) {
      this.props.onDayClick(day)
    }
  },

  renderDays () {
    const startOfWeek = this.props.day.clone().startOf('week')
    return [0, 1, 2, 3, 4, 5, 6].map(offset => {
      const day = startOfWeek.clone().add(offset, 'days')
      return (
        <Day
            key={offset}
            day={day}
            month={this.props.month}
            onClick={this.handleDayClick.bind(this, day)}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            includeDates={this.props.includeDates}
            filterDate={this.props.filterDate}
            selected={this.props.selected}
            startDate={this.props.startDate}
            endDate={this.props.endDate} />
      )
    })
  },

  render () {
    return (
      <div className="react-datepicker__week">
        {this.renderDays()}
      </div>
    )
  }

})

module.exports = Week
