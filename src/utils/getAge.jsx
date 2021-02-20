import moment from 'moment'

export default function getAge(dateString) {
  if (!dateString) return null
  var birthDay = +moment(dateString, 'DD.MM.yyyy')
  var age = ~~((Date.now() - birthDay) / 31557600000)
  return '(' + age + ' years)'
}
