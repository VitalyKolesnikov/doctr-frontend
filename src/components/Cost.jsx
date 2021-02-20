import NumberFormat from 'react-number-format'

const Cost = ({ value }) => {
  return (
    <NumberFormat value={value} displayType={'text'} thousandSeparator={true} />
  )
}

export default Cost
