import Send from "./Send";

export const addAttendance = (data) => {
  return Send({
    method: 'post',
    url: `/calendar-namelist/names`,
    data: data
  })
}

export const getAttendance = (eventId) => {
  return Send({
    method: 'get',
    url: `/calendar-namelist/search/${eventId}`
  })
}

export const attend = (data) => {
  return Send({
    method: 'post',
    url: '/attendance',
    data: data,
  })
}