import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import moment from 'moment'
import { isSameDay, isSameDayAndTime, allDaysDisabledBefore, allDaysDisabledAfter, getEffectiveMinDate, getEffectiveMaxDate } from './date_utils'

var Time = createReactClass({
  displayName: 'Time',

  propTypes: {
    selected: PropTypes.object,
    onTimeClick: PropTypes.func,
    onTimeRemoval: PropTypes.func,
    dateOnly: PropTypes.bool,
  },

  getInitialState () {
    return {
      selectedTime: []
    }
  },

  componentDidMount: function() {
    if (!this.props.dateOnly && this.refs.activeTime) {
      this.scrollElementIntoViewIfNeeded(this.refs.activeTime);
    }
  },

  scrollElementIntoViewIfNeeded(domNode) {
    var containerDomNode = ReactDOM.findDOMNode(this.refs.timeContainer);
    let scrollPosition = domNode.id * domNode.offsetHeight;
    containerDomNode.scrollTop = scrollPosition;
  },

  handleTimeClick (time) {
    this.props.onTimeClick(time);
  },

  handleTimeRemoval () {
    this.props.onTimeRemoval();
  },

  renderTimes () {
    let selectedHours = null;
    let selectedMinutes = null;

    if (!this.props.dateOnly) {
      selectedHours = moment(this.props.selected).get('hours');
      selectedMinutes = moment(this.props.selected).get('minutes');
    }

    let times = [];
    let startOfDay = moment().startOf('day');
    let endOfDay = moment().endOf('day');
    let time = startOfDay;

    while (time <= endOfDay) {
      times.push(time.toObject());
      time = time.clone().add(30, 'minutes');
    }
    return (
      <div ref="timeContainer" className="react-datepicker__times">
        <div key='unknown' id='unknown' ref={selectedHours && selectedMinutes === null ? 'activeTime' : null} className={'react-datepicker__time' + (this.props.dateOnly ? ' react-datepicker__time--selected' : '')} onClick={() => this.handleTimeRemoval()}>Unknown</div>
        {times.map((time, i) => (
          <div key={time.hours + time.minutes} id={i} ref={selectedHours === time.hours && selectedMinutes === time.minutes ? 'activeTime' : null} className={'react-datepicker__time' + (selectedHours === time.hours && selectedMinutes === time.minutes ? ' react-datepicker__time--selected' : '')} onClick={() => this.handleTimeClick(time)}>{moment().hours(time.hours).minutes(time.minutes).format('h:mm a').toString()}</div>
        ))}
      </div>
    )
  },

  render () {
    return (
      <div>
        {this.renderTimes()}
      </div>
    )
  }

})

module.exports = Time
