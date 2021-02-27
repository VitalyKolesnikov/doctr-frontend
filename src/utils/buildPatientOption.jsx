export default function buildPatientOption(lastName, firstName, middleName) {
  var result
  result = lastName + ' ' + firstName
  result += middleName ? ' ' + middleName : ''
  return result
}
