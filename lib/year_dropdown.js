'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _year_dropdown_options = require('./year_dropdown_options');

var _year_dropdown_options2 = _interopRequireDefault(_year_dropdown_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YearDropdown = (0, _createReactClass2.default)({
  displayName: 'YearDropdown',

  propTypes: {
    onChange: _propTypes2.default.func.isRequired,
    year: _propTypes2.default.number.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      dropdownVisible: false
    };
  },
  renderReadView: function renderReadView() {
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker__year-read-view', onClick: this.toggleDropdown },
      _react2.default.createElement(
        'span',
        { className: 'react-datepicker__year-read-view--selected-year' },
        this.props.year
      ),
      _react2.default.createElement('span', { className: 'react-datepicker__year-read-view--down-arrow' })
    );
  },
  renderDropdown: function renderDropdown() {
    return _react2.default.createElement(_year_dropdown_options2.default, {
      ref: 'options',
      year: this.props.year,
      onChange: this.onChange,
      onCancel: this.toggleDropdown });
  },
  onChange: function onChange(year) {
    this.toggleDropdown();
    if (year === this.props.year) return;
    this.props.onChange(year);
  },
  toggleDropdown: function toggleDropdown() {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      this.state.dropdownVisible ? this.renderDropdown() : this.renderReadView()
    );
  }
});

module.exports = YearDropdown;
