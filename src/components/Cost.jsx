import { NumericFormat } from 'react-number-format'

const Cost = ({ value }) => {
  return (
    <NumericFormat value={value} displayType={'text'} thousandSeparator={true} />
  )
}

export default Cost
