import PropTypes from 'prop-types';

const registrarType = PropTypes.shape({
  login: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
});

export { registrarType };
