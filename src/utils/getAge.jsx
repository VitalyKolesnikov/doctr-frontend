import moment from 'moment'

export default function getAge(dateString) {
  var birthDay = +moment(dateString, 'DD.MM.yyyy')
  return ~~((Date.now() - birthDay) / 31557600000)
}
