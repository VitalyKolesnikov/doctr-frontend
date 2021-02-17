import NumberFormat from 'react-number-format'

const Cost = ({ value }) => {
  return (
    <NumberFormat
      value={(value / 100).toFixed(2)}
      displayType={'text'}
      thousandSeparator={true}
    />
  )
}

export default Cost
