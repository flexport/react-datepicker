'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateYears(year) {
  var list = [];
  for (var i = 0; i < 5; i++) {
    list.push(year - i);
  }
  return list;
}

var YearDropdownOptions = (0, _createReactClass2.default)({
  displayName: 'YearDropdownOptions',

  propTypes: {
    onCancel: _propTypes2.default.func.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    year: _propTypes2.default.number.isRequired
  },

  mixins: [require('react-onclickoutside')],

  getInitialState: function getInitialState() {
    return {
      yearsList: generateYears(this.props.year)
    };
  },
  renderOptions: function renderOptions() {
    var _this = this;

    var selectedYear = this.props.year;
    var options = this.state.yearsList.map(function (year) {
      return _react2.default.createElement(
        'div',
        { className: 'react-datepicker__year-option',
          key: year,
          onClick: _this.onChange.bind(_this, year) },
        selectedYear === year ? _react2.default.createElement(
          'span',
          { className: 'react-datepicker__year-option--selected' },
          '\u2713'
        ) : '',
        year
      );
    });

    options.unshift(_react2.default.createElement(
      'div',
      { className: 'react-datepicker__year-option',
        ref: "upcoming",
        key: "upcoming",
        onClick: this.incrementYears },
      _react2.default.createElement('a', { className: 'react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming' })
    ));
    options.push(_react2.default.createElement(
      'div',
      { className: 'react-datepicker__year-option',
        ref: "previous",
        key: "previous",
        onClick: this.decrementYears },
      _react2.default.createElement('a', { className: 'react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous' })
    ));
    return options;
  },
  onChange: function onChange(year) {
    this.props.onChange(year);
  },
  handleClickOutside: function handleClickOutside() {
    this.props.onCancel();
  },
  shiftYears: function shiftYears(amount) {
    var years = this.state.yearsList.map(function (year) {
      return year + amount;
    });

    this.setState({
      yearsList: years
    });
  },
  incrementYears: function incrementYears() {
    return this.shiftYears(1);
  },
  decrementYears: function decrementYears() {
    return this.shiftYears(-1);
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker__year-dropdown' },
      this.renderOptions()
    );
  }
});

module.exports = YearDropdownOptions;
