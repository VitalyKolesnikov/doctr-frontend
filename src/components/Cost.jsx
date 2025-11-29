import { NumericFormat } from 'react-number-format'
import PropTypes from 'prop-types'

const Cost = ({ value }) => {
  return (
    <NumericFormat value={value} displayType={'text'} thousandSeparator={true} />
  )
}

Cost.propTypes = {
  value: PropTypes.number.isRequired,
}

export default Cost
