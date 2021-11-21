import PropTypes from 'prop-types';

const codeType = PropTypes.shape({
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});

export { codeType };
