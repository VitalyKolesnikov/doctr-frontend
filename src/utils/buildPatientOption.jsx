export default function buildPatientOption(
  lastName,
  firstName,
  middleName
  // birthDate
) {
  var result
  result = lastName + ' ' + firstName
  result += middleName ? ' ' + middleName : ''
  // result += birthDate ? ' (' + birthDate + ')' : ''
  return result
}
