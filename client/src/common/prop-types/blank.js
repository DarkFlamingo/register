import PropTypes from 'prop-types';
import { codeType } from './code';

const blankType = PropTypes.shape({
  series: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  issueDate: PropTypes.string.isRequired,
  code: codeType.isRequired
});

export { blankType };
