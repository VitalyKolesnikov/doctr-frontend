export default function makeInitials(firstName, middleName) {
  var result
  result = firstName.charAt(0) + '. '
  result += middleName ? middleName.charAt(0) + '.' : ''
  return result
}
